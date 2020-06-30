package io.javaclasses.filehub.storage.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("PasswordTest should ")
class PasswordTest {
    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(Password.class);
    }

    @DisplayName("test throwing of CredentialValidationExceptions due to non-validated password value.")
    @Test
    void testNonValidatedValue() {
        assertThrows(CredentialsAreNotValidException.class, () -> new Password("bad_password"),
                "Should throw CredentialsAreNotValidException because password value is not validated.");
    }

    @DisplayName("test successful creation of Password instance.")
    @Test
    void testInstanceCreation() {
        assertDoesNotThrow(() -> {
            Password goodPassword = new Password("goodPassword1");
            assertWithMessage("Password instance should not be null.")
                    .that(goodPassword)
                    .isNotNull();
        });
    }
}
