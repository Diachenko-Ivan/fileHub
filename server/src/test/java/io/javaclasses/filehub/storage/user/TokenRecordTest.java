package io.javaclasses.filehub.storage.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("TokenRecord should ")
class TokenRecordTest {

    @DisplayName("not accept null params")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(TokenId.class, new TokenId("dgshsdryf"));
        tester.setDefault(UserId.class, new UserId("ajoassddsfsf"));
        tester.testAllPublicConstructors(TokenRecord.class);
    }
}
