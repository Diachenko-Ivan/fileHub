package io.javaclasses.filehub.storage.item.file;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("FileSize should ")
class FileSizeTest {

    @DisplayName("not accept negative file size value to constructor.")
    @Test
    void testNegativeNumberOfItems() {
        assertThrows(IllegalArgumentException.class, () ->
                        new FileSize(-4),
                "Constructor did not throw an exception because of negative size, but should.");
    }

    @DisplayName("accept positive file size to constructor.")
    @Test
    void testPositiveNumberOfItems() {
        assertWithMessage("File size is incorrect.")
                .that(new FileSize(2).value())
                .isEqualTo(2);
    }
}
