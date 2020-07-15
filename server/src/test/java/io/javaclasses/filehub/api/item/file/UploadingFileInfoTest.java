package io.javaclasses.filehub.api.item.file;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("UploadingFileInfo should ")
class UploadingFileInfoTest {
    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(UploadingFileInfo.class);
    }

    @DisplayName("not accept negative file size value to constructor.")
    @Test
    void testNegativeFileSize() {
        assertThrows(IllegalArgumentException.class, () ->
                        new UploadingFileInfo("fsad", -40, "image/png", new byte[]{}),
                "Negative size was accepted but should not have been.");
    }
}
