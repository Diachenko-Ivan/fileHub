package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.storage.user.TokenRecord;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;
import io.javaclasses.filehub.storage.user.UserStorage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("AuthenticationProcessTest should ")
class AuthenticationProcessTest {

    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        assertThrows(NullPointerException.class, () -> new Authentication(null),
                "Should throw NullPointerException due to null constructor parameters.");
    }

    @DisplayName("test acceptance of null parameters to logIn() method.")
    @Test
    void testNullParametersToLogIn() {
        assertThrows(NullPointerException.class, () -> new Authentication(new UserStorage(new HashMap<>())).logIn(null),
                "Should throw NullPointerException due to null constructor parameters.");
    }

    @DisplayName("test successful authentication of existent user.")
    @Test
    void testSuccessfulLogin() {
        HashMap<UserId, User> users = new HashMap<>();
        UserStorage mockStorage = new UserStorage(users) {
            @Override
            public synchronized Optional<User> findByLoginAndPassword(String login, String password) {
                return Optional.of(new User(new UserId("qwe"), "login", "password"));
            }
        };
        AuthenticationProcess process = new Authentication(mockStorage);

        assertDoesNotThrow(() -> {
                    TokenRecord token = process.logIn(new AuthenticateUser("newlogin", "newpassword"));
                    assertWithMessage("Token should not be null but it is.").that(token).isNotNull();
                },
                "Should not throw AuthenticationException because user exists but it did.");
    }

    @DisplayName("test failed authentication of nonexistent user.")
    @Test
    void testUnsuccessfulLogin() {
        HashMap<UserId, User> users = new HashMap<>();
        UserStorage mockStorage = new UserStorage(users) {
            @Override
            public synchronized Optional<User> findByLoginAndPassword(String login, String password) {
                return Optional.empty();
            }
        };
        AuthenticationProcess process = new Authentication(mockStorage);

        assertThrows(AuthenticationException.class, () ->
                        process.logIn(new AuthenticateUser("newlogin", "newpassword")),
                "Should throw AuthenticationException because user does not exist.");
    }
}
