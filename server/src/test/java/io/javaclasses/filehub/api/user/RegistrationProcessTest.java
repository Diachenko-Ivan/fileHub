package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("RegistrationUserServiceTest should ")
class RegistrationProcessTest {

    @DisplayName("test acceptance of null parameters to constructor and methods.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Login.class, new Login("asdff"));
        tester.setDefault(Password.class, new Password("Qwerty123"));
        tester.testAllPublicConstructors(RegisterUser.class);
        tester.testAllPublicInstanceMethods(new Registration(new UserStorage()));
    }

    @Test
    @DisplayName("test successful registration of new user.")
    void testSuccessfulRegistration() {
        boolean[] isAddCalled = {false};
        Login login = new Login("john");
        Password password = new Password("Password1");
        UserStorage mockStorage = new UserStorage() {
            @Override
            public synchronized void add(User user) {
                isAddCalled[0] = true;
                assertWithMessage("Should transfer to storage correct user.")
                        .that(user.login()).isEqualTo(login.value());
            }
        };
        Registration registrationService = new Registration(mockStorage);
        assertDoesNotThrow(() -> registrationService.register(new RegisterUser(login, password)),
                "Should not throw LoginIsTakenException since user with such login does not exist.");
        assertWithMessage("Should call add method from UserStorage.")
                .that(isAddCalled[0])
                .isTrue();
    }

    @Test
    @DisplayName("test registration user with already existent login.")
    void testRegistrationOfUserWithExistentLogin() {
        Login repeatedLogin = new Login("john");
        UserStorage mockStorage = new UserStorage() {
            @Override
            public synchronized void add(User user) {
                fail("Should not call storage add method.");
            }

            @Override
            public synchronized Optional<User> findByLogin(String login) {
                return Optional.of(new User(new UserId("id"), login, "Password1"));
            }
        };
        Registration registration = new Registration(mockStorage);
        assertThrows(LoginIsTakenException.class,
                () -> registration.register(new RegisterUser(repeatedLogin, new Password("Password2"))),
                "Should throw LoginIsTakenException because user with such login is already registered.");
    }
}
