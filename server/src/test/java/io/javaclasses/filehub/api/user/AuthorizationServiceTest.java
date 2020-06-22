package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.storage.user.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("AuthorizationServiceTest should ")
class AuthorizationServiceTest {

    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testConstructorNullParams() {
        assertThrows(NullPointerException.class, () -> new AuthorizationService(null, null),
                "Should throw NullPointerException due to null constructor parameters.");
    }

    @DisplayName("test acceptance of null parameters to authorizedUser() method.")
    @Test
    void testRegistrationNullParams() {
        assertThrows(NullPointerException.class,
                () -> new AuthorizationService(new TokenStorage(new HashMap<>()), new UserStorage(new HashMap<>()))
                        .authorizedUser(null),
                "Should throw NullPointerException due to null method parameters.");
    }

    @DisplayName("test null returning from authorizedUser() method if token is not found")
    @Test
    void testAuthorizedUserByNotFoundToken() {
        UserStorage userStorage = new UserStorage(new HashMap<>());
        TokenStorage mockTokenStorage = new TokenStorage(new HashMap<>()) {
            @Override
            public TokenRecord findByToken(String tokenValue) {
                return null;
            }
        };
        AuthorizationService service = new AuthorizationService(mockTokenStorage, userStorage);
        User userByToken = service.authorizedUser("any_token");
        assertWithMessage("Authorized user should be null because access token is not found.")
                .that(userByToken)
                .isNull();
    }

    @DisplayName("test null returning from authorizedUser() method if token expired.")
    @Test
    void testAuthorizedUserByExpiredToken() {
        final boolean[] isRemoveCalled = {false};
        UserStorage userStorage = new UserStorage(new HashMap<>());
        TokenStorage mockTokenStorage = new TokenStorage(new HashMap<>()) {
            @Override
            public TokenRecord findByToken(String tokenValue) {
                return new TokenRecord(new TokenId("tokeid"), "tokenvalue",
                        new UserId("userid"), new Date(new Date().getTime() - 10000));
            }

            @Override
            public TokenRecord remove(String tokenValue) {
                isRemoveCalled[0] = true;
                return null;
            }
        };
        AuthorizationService service = new AuthorizationService(mockTokenStorage, userStorage);
        User userByToken = service.authorizedUser("any_token");
        assertWithMessage("Authorized user should be null because access token is expired.")
                .that(userByToken)
                .isNull();
        assertWithMessage("Token removing should be called but it was not.")
                .that(isRemoveCalled[0])
                .isTrue();
    }

    @DisplayName("test returning of user from authorizedUser() method.")
    @Test
    void testSuccessfulUserAuthorization() {
        User authorizedUser = new User(new UserId("authorized-user"), "john", "smith");
        UserStorage mockUserStorage = new UserStorage(new HashMap<>()) {
            @Override
            public synchronized Optional<User> findById(UserId id) {
                return Optional.of(authorizedUser);
            }
        };
        TokenStorage mockTokenStorage = new TokenStorage(new HashMap<>()) {
            @Override
            public TokenRecord findByToken(String tokenValue) {
                return new TokenRecord(new TokenId("tokeid"), "tokenvalue",
                        new UserId("userid"), new Date(new Date().getTime() + 10000));
            }
        };
        AuthorizationService service = new AuthorizationService(mockTokenStorage, mockUserStorage);
        User userByToken = service.authorizedUser("any_token");
        assertWithMessage("Authorized user should not be null.")
                .that(userByToken)
                .isNotNull();
        assertWithMessage("Authorized user should be equal to found by id user.")
                .that(userByToken)
                .isEqualTo(authorizedUser);
    }

    @DisplayName("test acceptance of null parameters to createSession() method.")
    @Test
    void testCreateSessionNullParam() {
        assertThrows(NullPointerException.class, () ->
                        new AuthorizationService(new TokenStorage(new HashMap<>()), new UserStorage(new HashMap<>()))
                                .createSession(null),
                "Should throw NullPointerException due to null method parameters.");
    }


    @DisplayName("test call of token storage add method in create session.")
    @Test
    void testCallOfAddMethod() {
        boolean[] isAddCalled = {false};
        TokenRecord record = new TokenRecord(new TokenId("tokeid"), "tokenvalue",
                new UserId("userid"), new Date(new Date().getTime() + 10000));
        TokenStorage mockTokenStorage = new TokenStorage(new HashMap<>()) {
            @Override
            public void add(TokenRecord transferredRecord) {
                assertWithMessage("Transferred token record should be equal with record in createSession() param")
                        .that(transferredRecord)
                        .isEqualTo(record);
                isAddCalled[0] = true;
            }
        };
        AuthorizationService service = new AuthorizationService(mockTokenStorage, new UserStorage(new HashMap<>()));
        service.createSession(record);
        assertWithMessage("Method for token adding should be called.")
                .that(isAddCalled[0])
                .isTrue();
    }
}
