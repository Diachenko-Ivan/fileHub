package io.javaclasses.filehub.web.routes;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.LoggedInUserStorage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import spark.Request;
import spark.Response;

import java.util.stream.Stream;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("LogoutRoute should ")
class LogoutRouteTest {

    private static Stream<Arguments> authorizationHeaders() {
        return Stream.of(
                Arguments.of("Bearer dfghrtfherthrth"),
                Arguments.of("Bearer osjidfjg[er'fpodj"),
                Arguments.of("Bearer [ihsf9ugeoigipaeji]"));
    }

    private Request mockRequestWithHeader(String authorizationHeader) {
        return new Request() {
            @Override
            public String headers(String header) {
                return authorizationHeader;
            }
        };
    }

    private Response mockResponse() {
        return new Response() {
            int status;

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

    @DisplayName("not accept null params to constructor.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(LogoutRoute.class);
    }

    @DisplayName("return 200 status after user logout.")
    @ParameterizedTest
    @MethodSource("authorizationHeaders")
    void testUserLogoutWithHeader(String authorizationHeader) {
        LogoutRoute logoutRoute = new LogoutRoute(new LoggedInUserStorage());

        Request mockRequest = mockRequestWithHeader(authorizationHeader);
        Response mockResponse = mockResponse();

        logoutRoute.handle(mockRequest, mockResponse);

        assertWithMessage("The response status is not 200.")
                .that(mockResponse.status())
                .isEqualTo(200);
    }

}
