package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("LogOutUser should ")
class LogOutUserTest {

    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(LogOutUser.class);
    }
}
