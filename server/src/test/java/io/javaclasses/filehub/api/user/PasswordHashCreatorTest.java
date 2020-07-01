package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("StringHashCreatorTest should ")
class PasswordHashCreatorTest {

    @DisplayName("test acceptance of null param to hashedString method")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(NotValidCredential.class);
        tester.testAllPublicStaticMethods(NotValidCredential.class);
    }

    @DisplayName("test returning of not null value in result of hashing.")
    @Test
    void testNotNullResultOfHashing() {
        String stringToHash = "password";
        assertWithMessage("Should not return null result of hashing.")
                .that(PasswordHashCreator.hashedPassword(stringToHash)).isNotNull();
    }
}
