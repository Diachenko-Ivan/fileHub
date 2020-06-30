package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static java.util.Optional.empty;
import static java.util.Optional.of;
import static org.junit.jupiter.api.Assertions.assertThrows;

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
                return of(new TokenRecord(new TokenId("tokeid"),
                        new UserId("userid"), new Date(new Date().getTime() - 10000)));
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
                    return of(new TokenRecord(new TokenId(tokenId),
                            userIdInToken, new Date(new Date().getTime() + 10000)));
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
