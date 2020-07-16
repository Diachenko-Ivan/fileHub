package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.CredentialsAreNotValidException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("CredentialsAreNotValidExceptionTest should ")
class CredentialsAreNotValidExceptionTest {

    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testConstructorNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(CredentialsAreNotValidException.class);
    }
}
