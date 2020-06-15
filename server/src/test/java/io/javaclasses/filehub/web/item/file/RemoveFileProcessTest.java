package io.javaclasses.filehub.web.item.file;

import io.javaclasses.filehub.web.item.RemoveItemProcess;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@DisplayName("RemoveFileProcess should ")
class RemoveFileProcessTest {

    @DisplayName("successfully remove existent file.")
    @Test
    void testFileRemove() {
        RemoveItemProcess removeFileProcess = new RemoveFileProcess();
        assertDoesNotThrow(() -> removeFileProcess.remove("qwerty"));
    }
}