package io.javaclasses.filehub.storage.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("LoginTest should ")
class LoginTest {

    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(Login.class);
    }

    @DisplayName("test throwing of CredentialValidationException due to non-validated login value.")
    @Test
    void testNonValidatedValue() {
        assertThrows(CredentialsAreNotValidException.class, () -> new Login("bad_login"),
                "Should throw CredentialsAreNotValidException because login value is not validated.");
    }

    @DisplayName("test successful creation of Login instance.")
    @Test
    void testInstanceCreation() {
        assertDoesNotThrow(() -> {
            Login goodLogin = new Login("goodLogin");
            assertWithMessage("Login instance should not be null.")
                    .that(goodLogin)
                    .isNotNull();
        });
    }
}
