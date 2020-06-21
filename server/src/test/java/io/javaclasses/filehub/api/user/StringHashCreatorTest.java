package io.javaclasses.filehub.api.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("StringHashCreatorTest should ")
class StringHashCreatorTest {

    @DisplayName("test acceptance of null param to hashedString method")
    @Test
    void testNullParams() {
        assertThrows(NullPointerException.class, () -> StringHashCreator.hashedString(null),
                "Should throw NullPointerException due to null method parameters.");
    }

    @DisplayName("test returning of not null value in result of hashing.")
    @Test
    void testNotNullResultOfHashing() {
        String stringToHash = "password";
        assertWithMessage("Should not return null result of hashing.")
                .that(StringHashCreator.hashedString(stringToHash)).isNotNull();
    }
}