package io.javaclasses.filehub.web.item.file;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@DisplayName("RenameFileProcess should ")
class RenameFileProcessTest {

    @DisplayName("successfully rename existent file.")
    @Test
    void testFileRename() {
        RenameFileProcess renameFileProcess = new RenameFileProcessImpl();
        assertDoesNotThrow(() -> {
            FileDto renamedFile = renameFileProcess.rename(new FileDto("qwe", "image.png", "123", "image/png", 12423));
            assertWithMessage("Renamed file DTO should not be null.").that(renamedFile).isNotNull();
        }, "Should not throw FileNotFoundException because folder exists.");
    }
}