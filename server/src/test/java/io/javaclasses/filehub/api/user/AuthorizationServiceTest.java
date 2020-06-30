package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.TokenId;
import io.javaclasses.filehub.storage.user.TokenRecord;
import io.javaclasses.filehub.storage.user.TokenStorage;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static java.time.Instant.now;
import static java.time.Instant.ofEpochSecond;
import static java.util.Optional.empty;

@DisplayName("AuthorizationService should ")
class AuthorizationServiceTest {

    @DisplayName("not accept null parameters to constructor and method.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(AuthorizationService.class);
        tester.testAllPublicInstanceMethods(new AuthorizationService(new TokenStorage()));
    }


    @DisplayName("return null from authorizedUserId() method if token is not found.")
    @Test
    void testAuthorizedUserByNotFoundToken() {
        TokenStorage mockTokenStorage = new TokenStorage() {
            @Override
            public Optional<TokenRecord> find(TokenId id) {
                return empty();
            }
        };
        AuthorizationService service = new AuthorizationService(mockTokenStorage);
        UserId userId = service.authorizedUserId("any_token");

        assertWithMessage("User is not null but must be because access token is not found.")
                .that(userId)
                .isNull();
    }

    @DisplayName("return null from authorizedUserId() method if token is expired.")
    @Test
    void testAuthorizedUserByExpiredToken() {
        final boolean[] isRemoveCalled = {false};
        TokenStorage mockTokenStorage = new TokenStorage() {
            @Override
            public Optional<TokenRecord> find(TokenId id) {
                return Optional.of(new TokenRecord(new TokenId("tokeid"),
                        new UserId("userid"), ofEpochSecond(now().getEpochSecond() - 400)));
            }

            @Override
            public synchronized TokenRecord remove(TokenId id) {
                isRemoveCalled[0] = true;
                return null;
            }
        };
        AuthorizationService service = new AuthorizationService(mockTokenStorage);
        UserId userid = service.authorizedUserId("any_token");

        assertWithMessage("User is not null but must be because access token is expired.")
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

        TokenStorage mockTokenStorage = new TokenStorage() {
            @Override
            public Optional<TokenRecord> find(TokenId id) {
                if (id.value().equals(tokenId)) {
                    return Optional.of(new TokenRecord(new TokenId(tokenId),
                            userIdInToken, ofEpochSecond(now().getEpochSecond() + 400)));
                }
                return empty();
            }
        };
        AuthorizationService service = new AuthorizationService(mockTokenStorage);
        UserId authorizedUserId = service.authorizedUserId(tokenId);

        assertWithMessage("Authorized user is null.")
                .that(authorizedUserId)
                .isNotNull();
        assertWithMessage("Authorized user id is not equal to user id from token record.")
                .that(authorizedUserId)
                .isEqualTo(userIdInToken);
    }
}
