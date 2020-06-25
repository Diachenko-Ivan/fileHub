package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("RegisterUserTest should ")
class RegisterUserTest {

    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testConstructorNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(RegisterUser.class);
    }
}
