package io.javaclasses.filehub.web.routes;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("LogoutRoute should ")
class LogoutRouteTest {

    @DisplayName("not accept null params to constructor.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(LogoutRoute.class);
    }
}
