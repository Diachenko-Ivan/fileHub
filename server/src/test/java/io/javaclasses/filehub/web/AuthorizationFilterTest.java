package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.LoggedInUserRecord;
import io.javaclasses.filehub.storage.user.LoggedInUserStorage;
import io.javaclasses.filehub.storage.user.Token;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import spark.HaltException;
import spark.Request;
import spark.Response;

import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static java.util.Optional.empty;

@DisplayName("AuthorizationFilter should ")
class AuthorizationFilterTest {

    private Response mockResponse() {
        return new Response() {
            private int status;

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
        tester.testAllPublicConstructors(AuthorizationFilter.class);
    }

    @DisplayName("not allow request with no Authorization header.")
    @Test
    void testNonExistentAuthorizationHeader() {
        Request mockRequest = new Request() {
            @Override
            public String headers(String header) {
                return null;
            }
        };
        AuthorizationFilter filter = new AuthorizationFilter(new LoggedInUserStorage());
        Response mockResponse = mockResponse();

        try {
            filter.handle(mockRequest, mockResponse);
        } catch (HaltException e) {
            mockResponse.status(e.statusCode());
        }

        assertWithMessage("Response status is not 401 but must be because request with no Authorization header.")
                .that(mockResponse.status())
                .isEqualTo(401);
    }

    @DisplayName("not allow request because Authorization header has incorrect format.")
    @Test
    void testUser() {
        Request mockRequest = new Request() {
            @Override
            public String headers(String header) {
                return "wrong_format_authorization_token";
            }
        };
        AuthorizationFilter filter = new AuthorizationFilter(new LoggedInUserStorage());
        Response mockResponse = mockResponse();

        try {
            filter.handle(mockRequest, mockResponse);
        } catch (HaltException e) {
            mockResponse.status(e.statusCode());
        }

        assertWithMessage("Response status is not 401 but must be" +
                " because header value is not type 'Bearer access_token'.")
                .that(mockResponse.status())
                .isEqualTo(401);
    }

    @DisplayName("not allow request because token does not exist.")
    @Test
    void testUnauthorizedUserRequest() {
        Request mockRequest = new Request() {
            @Override
            public String headers(String header) {
                return "Bearer expired_token";
            }

            @Override
            public String pathInfo() {
                return "/api/request-path";
            }
        };
        LoggedInUserStorage mockLoggedInUserStorage = new LoggedInUserStorage() {
            @Override
            public synchronized Optional<LoggedInUserRecord> find(Token id) {
                return empty();
            }
        };
        AuthorizationFilter filter = new AuthorizationFilter(mockLoggedInUserStorage);
        Response mockResponse = mockResponse();

        try {
            filter.handle(mockRequest, mockResponse);
        } catch (HaltException e) {
            mockResponse.status(e.statusCode());
        }

        assertWithMessage("Response status is not 401 but must be" +
                " because user with this access token does not exists.")
                .that(mockResponse.status())
                .isEqualTo(401);
    }
}
