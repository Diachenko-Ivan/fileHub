package io.javaclasses.filehub.web.routes;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.user.Authentication;
import io.javaclasses.filehub.storage.user.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import spark.Request;
import spark.Response;

import java.util.Optional;
import java.util.stream.Stream;

import static com.google.common.truth.Truth.assertWithMessage;
import static java.util.Optional.ofNullable;

@DisplayName("AuthenticationRoute")
class AuthenticationRouteTest {

    private static Stream<Arguments> requestBodiesForParseError() {
        return Stream.of(
                Arguments.of("hello"),
                Arguments.of("<script></script>"),
                Arguments.of("{\"someProperty\":\"value\"}"));
    }

    private UserStorage mockUserStorage(User findResult) {
        return new UserStorage() {
            @Override
            public synchronized Optional<User> find(Login login, String hashedPassword) {
                return ofNullable(findResult);
            }
        };
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
        tester.testAllPublicConstructors(Authentication.class);
    }

    @DisplayName("return 422 response status because of bad request body.")
    @ParameterizedTest
    @MethodSource("requestBodiesForParseError")
    void testUnprocessedRequestBody(String requestBody) {
        AuthenticationRoute authenticationRoute = new AuthenticationRoute(new UserStorage(), new LoggedInUserStorage());
        Request mockRequest = mockRequestWithBody(requestBody);
        Response mockResponse = mockResponse();

        authenticationRoute.handle(mockRequest, mockResponse);

        assertWithMessage("Response status is not 422.")
                .that(mockResponse.status())
                .isEqualTo(422);
    }

    @DisplayName("return 200 response status since user is authenticated.")
    @Test
    void testUserIsAuthenticated() {
        UserStorage mockUserStorage = mockUserStorage(
                new User(new UserId("asfsdd"), new Login("john"), "qweqweqwe"));

        AuthenticationRoute authenticationRoute = new AuthenticationRoute(mockUserStorage, new LoggedInUserStorage());
        Request mockRequest = mockRequestWithBody("{\"login\":\"john\", \"password\":\"Qwerty123\"}");
        Response mockResponse = mockResponse();

        authenticationRoute.handle(mockRequest, mockResponse);

        assertWithMessage("Response status is not 200.")
                .that(mockResponse.status())
                .isEqualTo(200);
    }

    @DisplayName("return 401 response status since user is not authenticated.")
    @Test
    void testUserIsNotAuthenticated() {
        UserStorage mockUserStorage = mockUserStorage(null);
        AuthenticationRoute authenticationRoute = new AuthenticationRoute(mockUserStorage, new LoggedInUserStorage());
        Request mockRequest = mockRequestWithBody("{\"login\":\"john\", \"password\":\"Qwerty123\"}");
        Response mockResponse = mockResponse();

        authenticationRoute.handle(mockRequest, mockResponse);

        assertWithMessage("Response status is not 200.")
                .that(mockResponse.status())
                .isEqualTo(401);
    }
}
