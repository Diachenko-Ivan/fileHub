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
        tester.testAllPublicConstructors(Authentication.class);
        tester.testAllPublicInstanceMethods(new Authentication(new UserStorage(), new LoggedInUserStorage()));
    }

    private static class MockLoggedInUserStorage {
        private boolean isAddCalled = false;

        private LoggedInUserStorage create() {
            return new LoggedInUserStorage() {
                @Override
                public synchronized void add(LoggedInUserRecord record) {
                    isAddCalled = true;
                }
            };
        }

        private boolean isAddCalled() {
            return isAddCalled;
        }
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
    void testPassedUserAuthentication() {
        MockLoggedInUserStorage mockStorage = new MockLoggedInUserStorage();

        LoggedInUserStorage mockLoggedInUserStorage = mockStorage.create();

        UserStorage mockUserStorage = mockUserStorage(new User(new UserId("qwe"), new Login("login"), "password"));

        Authentication process = new Authentication(mockUserStorage, mockLoggedInUserStorage);

        assertDoesNotThrow(() -> {
                    LoggedInUserRecord loggedInUser = process.handle(
                            new AuthenticateUser(new Login("login"), new Password("Password1")));

                    assertWithMessage("Token should not be null but it is.")
                            .that(loggedInUser)
                            .isNotNull();

                    assertWithMessage("The token was not added to the storage.")
                            .that(mockStorage.isAddCalled())
                            .isTrue();
                },
                "Authentication error was thrown but it should not because user exists.");
    }

    @DisplayName("fail authentication of nonexistent user.")
    @Test
    void testFailedUserAuthentication() {
        MockLoggedInUserStorage mockStorageProxy = new MockLoggedInUserStorage();

        LoggedInUserStorage mockLoggedInUserStorage = mockStorageProxy.create();

        UserStorage mockUserStorage = mockUserStorage(null);

        Authentication process = new Authentication(mockUserStorage, mockLoggedInUserStorage);

        assertThrows(UserIsNotAuthenticatedException.class, () ->
                        process.handle(new AuthenticateUser(new Login("login"), new Password("Password1"))),
                "Should throw AuthenticationException because user does not exist.");

        assertWithMessage("Token was added to token storage after failed authentication.")
                .that(mockStorageProxy.isAddCalled())
                .isFalse();
    }
}
