package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;
import io.javaclasses.filehub.storage.user.UserStorage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("RegistrationUserServiceTest should ")
class RegistrationProcessTest {

    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testConstructorNullParams() {
        assertThrows(NullPointerException.class, () -> new Registration(null),
                "Should throw NullPointerException due to null constructor parameters.");
    }

    @DisplayName("test acceptance of null parameters to register() method.")
    @Test
    void testRegistrationNullParams() {
        assertThrows(NullPointerException.class,
                () -> new Registration(new UserStorage(new HashMap<>())).register(null),
                "Should throw NullPointerException due to null method parameters.");
    }

    @Test
    @DisplayName("test successful registration of new user.")
    void testSuccessfulRegistration() {
        String login = "john";
        String password = "Password1";
        HashMap<UserId, User> userHashMap = new HashMap<>();
        UserStorage mockStorage = new UserStorage(userHashMap){
            @Override
            public synchronized void add(User user) {
                assertWithMessage("Should transfer to storage User with correct login.")
                        .that(user.login()).isEqualTo(login);
            }
        };
        RegistrationProcess registrationService = new Registration(mockStorage);
        assertDoesNotThrow(() -> registrationService.register(new RegisterUser(login, password)),
                "Should not throw BusyLoginException since user with such login does not exist.");
    }

    @Test
    @DisplayName("test registration user with already existent login.")
    void testRegistrationOfUserWithExistentLogin() {
        String repeatedLogin = "john";
        HashMap<UserId, User> userHashMap = new HashMap<>();
        UserStorage mockStorage = new UserStorage(userHashMap) {
            @Override
            public synchronized void add(User user) {
                fail("Should not call storage add method.");
            }

            @Override
            public synchronized Optional<User> findByLogin(String login) {
                return Optional.of(new User(new UserId("id"), repeatedLogin, "Password1"));
            }
        };
        RegistrationProcess registration = new Registration(mockStorage);
        assertThrows(BusyLoginException.class,
                () -> registration.register(new RegisterUser(repeatedLogin, "Password2")),
                "Should throw BusyLoginException because user with such login is already registered.");
    }
}