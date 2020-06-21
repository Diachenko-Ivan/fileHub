package io.javaclasses.filehub.api.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("RegisterUserTest should ")
class RegisterUserTest {

    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testConstructorNullParams() {
        assertThrows(NullPointerException.class, () -> new RegisterUser(null, null),
                "Should throw NullPointerException due to null constructor parameters.");
    }

    @DisplayName("test throwing of CredentialValidationExceptions due to non-validated credentials.")
    @Test
    void testUnacceptableValues() {
        try {
            new RegisterUser("bad_login", "bad_password");
            fail("Should throw CredentialValidationException due to bad credentials.");
        } catch (CredentialValidationException e) {
            assertWithMessage("Should contain 2 failed credentials since " +
                    "login and password are not validated").that(e.failedCredentials()).hasLength(2);
        }
    }
}