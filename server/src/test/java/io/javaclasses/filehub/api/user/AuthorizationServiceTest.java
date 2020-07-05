package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.LoggedInUserRecord;
import io.javaclasses.filehub.storage.user.LoggedInUserStorage;
import io.javaclasses.filehub.storage.user.Token;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static java.util.Optional.empty;

@DisplayName("AuthorizationService should ")
class AuthorizationServiceTest {

    @DisplayName("not accept null parameters to constructor and method.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(AuthorizationService.class);
        tester.testAllPublicInstanceMethods(new AuthorizationService(new LoggedInUserStorage()));
    }


    @DisplayName("return null from authorizedUserId() method if token is not found.")
    @Test
    void testAuthorizedUserByNotFoundToken() {
        LoggedInUserStorage mockLoggedInUserStorage = new LoggedInUserStorage() {
            @Override
            public synchronized Optional<LoggedInUserRecord> find(Token id) {
                return empty();
            }
        };
        AuthorizationService service = new AuthorizationService(mockLoggedInUserStorage);
        UserId userId = service.authorizedUserId("any_token");

        assertWithMessage("User identifier is not null but must be because access token is not found.")
                .that(userId)
                .isNull();
    }

    @DisplayName("return null from authorizedUserId() method if token is expired.")
    @Test
    void testAuthorizedUserByExpiredToken() {
        final boolean[] isRemoveCalled = {false};
        LoggedInUserStorage mockLoggedInUserStorage = new LoggedInUserStorage() {
            @Override
            public synchronized Optional<LoggedInUserRecord> find(Token id) {
                return Optional.of(new LoggedInUserRecord(new Token("tokeid"),
                        new UserId("userid"), LocalDateTime.now().minusMinutes(400)));
            }

            @Override
            public synchronized LoggedInUserRecord remove(Token id) {
                isRemoveCalled[0] = true;
                return null;
            }
        };
        AuthorizationService service = new AuthorizationService(mockLoggedInUserStorage);
        UserId userid = service.authorizedUserId("any_token");

        assertWithMessage("User identifier is not null but must be because access token is expired.")
                .that(userid)
                .isNull();
        assertWithMessage("Token removing should be called but it was not.")
                .that(isRemoveCalled[0])
                .isTrue();
    }

    @DisplayName("return authorized user identifier.")
    @Test
    void testSuccessfulUserAuthorization() {
        String tokenId = "any_token";
        UserId userIdInToken = new UserId("userid");

        LoggedInUserStorage mockLoggedInUserStorage = new LoggedInUserStorage() {
            @Override
            public synchronized Optional<LoggedInUserRecord> find(Token id) {
                if (id.value().equals(tokenId)) {
                    return Optional.of(new LoggedInUserRecord(new Token(tokenId),
                            userIdInToken, LocalDateTime.now().plusMinutes(400)));
                }
                return empty();
            }
        };
        AuthorizationService service = new AuthorizationService(mockLoggedInUserStorage);
        UserId authorizedUserId = service.authorizedUserId(tokenId);

        assertWithMessage("Authorized user identifier is null.")
                .that(authorizedUserId)
                .isNotNull();
        assertWithMessage("Authorized user identifier is not equal to user identifier from token record.")
                .that(authorizedUserId)
                .isEqualTo(userIdInToken);
    }
}
