package io.javaclasses.filehub.api.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("FailedCredentialTest should ")
class FailedCredentialTest {

    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        assertThrows(NullPointerException.class, () -> new FailedCredential(null, null),
                "Should throw NullPointerException due to null constructor parameters.");
    }

}