package io.javaclasses.filehub.web.routes;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.UserStorage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import spark.Request;
import spark.Response;

import java.util.stream.Stream;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("RegistrationRoute should ")
class RegistrationRouteTest {

    private static Stream<Arguments> requestBodiesForParseError() {
        return Stream.of(
                Arguments.of("hello"),
                Arguments.of("<script></script>"),
                Arguments.of("{\"someProperty\":\"value\"}"));
    }

    private static Stream<Arguments> requestBodiesForSuccess() {
        return Stream.of(
                Arguments.of("{\"login\":\"john\", \"password\":\"Qwerty123\"}"),
                Arguments.of("{\"login\":\"martin\", \"password\":\"Password1\"}"),
                Arguments.of("{\"login\":\"linus\", \"password\":\"torvalD12\"}"));
    }

    private Request mockRequestWithBody(String body) {
        return new Request() {
            @Override
            public String body() {
                return body;
            }
        };
    }

    private Response mockResponse() {
        return new Response() {
            int status;

            @Override
            public void type(String contentType) {
            }

            @Override
            public void status(int statusCode) {
                status = statusCode;
            }

            @Override
            public int status() {
                return status;
            }
        };
    }

    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullParam() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(RegistrationRoute.class);
    }

    @DisplayName("send 422 response status because of bad request body.")
    @ParameterizedTest
    @MethodSource("requestBodiesForParseError")
    void testParseError(String requestBody) {
        RegistrationRoute registrationRoute = new RegistrationRoute(new UserStorage(), new FolderMetadataStorage());
        Request request = mockRequestWithBody(requestBody);
        Response response = mockResponse();
        registrationRoute.handle(request, response);
        assertWithMessage("Response status is not 422.").that(response.status()).isEqualTo(422);
    }

    @DisplayName("send 200 response status.")
    @ParameterizedTest
    @MethodSource("requestBodiesForSuccess")
    void testSuccessRegistration(String requestBody) {
        RegistrationRoute registrationRoute = new RegistrationRoute(new UserStorage(), new FolderMetadataStorage());
        Request request = mockRequestWithBody(requestBody);
        Response response = mockResponse();
        registrationRoute.handle(request, response);
        assertWithMessage("Response status is not 200.").that(response.status()).isEqualTo(200);
    }

    @DisplayName("send 400 response status because user already exists.")
    @Test
    void testRegisterExistentUser() {
        String userCredentials = "{\"login\":\"john\", \"password\":\"Qwerty123\"}";
        RegistrationRoute registrationRoute = new RegistrationRoute(new UserStorage(), new FolderMetadataStorage());
        Request request = mockRequestWithBody(userCredentials);
        Response response = mockResponse();
        registrationRoute.handle(request, response);
        registrationRoute.handle(request, response);
        assertWithMessage("Response status is not 400.").that(response.status()).isEqualTo(400);
    }
}
