package io.javaclasses.filehub.storage.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("TokenRecord should ")
class LoggedInUserRecordTest {

    @DisplayName("not accept null params")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Token.class, new Token("dgshsdryf"));
        tester.setDefault(UserId.class, new UserId("ajoassddsfsf"));
        tester.testAllPublicConstructors(LoggedInUserRecord.class);
    }
}
