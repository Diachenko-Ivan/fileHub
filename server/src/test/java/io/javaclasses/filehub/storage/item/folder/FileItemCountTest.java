package io.javaclasses.filehub.storage.item.folder;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("FileItemCount should ")
class FileItemCountTest {

    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(FileItemCount.class);
    }

    @DisplayName("not accept negative value to constructor.")
    @Test
    void testNegativeNumberOfItems() {
        assertThrows(IllegalArgumentException.class, () -> new FileItemCount(-2),
                "Constructor did not throw exception because of incorrect value.");
    }

    @DisplayName("accept positive value to constructor.")
    @Test
    void testPositiveNumberOfItems() {
        assertDoesNotThrow(() -> assertWithMessage("Number of files is incorrect.")
                        .that(new FileItemCount(2).value())
                        .isEqualTo(2),
                "Constructor threw an exception but value is correct.");
    }
}
