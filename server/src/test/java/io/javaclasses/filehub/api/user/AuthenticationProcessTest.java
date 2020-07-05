package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("AuthenticationProcess should ")
class AuthenticationProcessTest {

    @DisplayName("not accept null parameters to constructor and method.")
    @Test
    void testNullParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(AuthorizationService.class);
        tester.testAllPublicInstanceMethods(new AuthorizationService(new TokenStorage()));
    }

    private TokenStorage mockTokenStorage(boolean[] isAddCalled)  {
        return new TokenStorage() {
            @Override
            public synchronized void add(LoggedInUserRecord record) {
                isAddCalled[0] = true;
            }
        };
    }

    private UserStorage mockUserStorage(User userFindResult) {
        return new UserStorage() {
            @Override
            public synchronized Optional<User> find(Login login, String hashedPassword) {
                return Optional.ofNullable(userFindResult);
            }
        };
    }

    @DisplayName("authenticate existent user.")
    @Test
    void testSuccessfulLogin() {
        boolean[] isAddCalled = {false};

        TokenStorage mockTokenStorage = mockTokenStorage(isAddCalled);

        UserStorage mockUserStorage = mockUserStorage(new User(new UserId("qwe"), new Login("login"), "password"));

        Authentication process = new Authentication(mockUserStorage, mockTokenStorage);

        assertDoesNotThrow(() -> {
                    LoggedInUserRecord token = process.handle(
                            new AuthenticateUser(new Login("login"), new Password("Password1")));

                    assertWithMessage("Token should not be null but it is.")
                            .that(token)
                            .isNotNull();

                    assertWithMessage("The token was not added to the storage.")
                            .that(isAddCalled[0])
                            .isTrue();
                },
                "Authentication error was thrown but it should not because user exists.");
    }

    @DisplayName("fail authentication of nonexistent user.")
    @Test
    void testUnsuccessfulLogin() {
        boolean[] isAddCalled = {false};

        TokenStorage mockTokenStorage = mockTokenStorage(isAddCalled);
        UserStorage mockUserStorage = mockUserStorage(null);

        Authentication process = new Authentication(mockUserStorage, mockTokenStorage);

        assertThrows(UserIsNotAuthenticatedException.class, () ->
                        process.handle(new AuthenticateUser(new Login("login"), new Password("Password1"))),
                "Should throw AuthenticationException because user does not exist.");

        assertWithMessage("Token was added to token storage after failed authentication.")
                .that(isAddCalled[0])
                .isFalse();
    }
}
