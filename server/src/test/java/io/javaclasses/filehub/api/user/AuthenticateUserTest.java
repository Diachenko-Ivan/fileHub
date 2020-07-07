package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.Login;
import io.javaclasses.filehub.storage.user.Password;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("AuthenticateUser ")
class AuthenticateUserTest {

    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testConstructorNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Login.class, new Login("login"));
        tester.setDefault(Password.class, new Password("Password1"));
        tester.testAllPublicConstructors(AuthenticateUser.class);
    }
}
