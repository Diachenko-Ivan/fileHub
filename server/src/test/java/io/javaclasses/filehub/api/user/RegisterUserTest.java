package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.Login;
import io.javaclasses.filehub.storage.user.Password;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@DisplayName("RegisterUserTest should ")
class RegisterUserTest {

    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testConstructorNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Login.class, new Login("login"));
        tester.setDefault(Password.class, new Password("Password1"));
        tester.testAllPublicConstructors(RegisterUser.class);
    }

    @DisplayName("test creation of instance.")
    @Test
    void testSuccessfulInstanceCreation() {
        assertDoesNotThrow(() -> {
            RegisterUser registerUserCommand =
                    new RegisterUser(new Login("goodLogin"), new Password("goodPassword1"));
            assertWithMessage("Created RegisterUser command should not be null.")
                    .that(registerUserCommand)
                    .isNotNull();
        }, "Should not throw any exception.");
    }
}
