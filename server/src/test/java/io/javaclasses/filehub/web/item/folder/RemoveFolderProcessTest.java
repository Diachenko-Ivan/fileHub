package io.javaclasses.filehub.web.item.folder;

import io.javaclasses.filehub.web.item.RemoveItemProcess;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@DisplayName("RemoveFolderProcess should ")
class RemoveFolderProcessTest {

    @DisplayName("successfully remove existent folder.")
    @Test
    void testRemoveOfExistentFolder() {
        RemoveItemProcess removeFolderProcess = new RemoveFolderProcess();
        assertDoesNotThrow(() -> removeFolderProcess.remove("qwerty"));
    }
}