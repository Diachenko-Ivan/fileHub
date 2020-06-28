package io.javaclasses.filehub.storage.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("UserTest should ")
class UserTest {
    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(UserId.class, new UserId("id"));
        tester.setDefault(Login.class, new Login("login"));
        tester.testAllPublicConstructors(User.class);
    }
}
