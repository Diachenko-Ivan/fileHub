package io.javaclasses.filehub.web.item.folder;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("CreateFolderProcess should ")
class CreateFolderProcessTest {

    @DisplayName("successfully create new folder.")
    @Test
    void testFolderCreation() {
        CreateFolderProcess createFolderProcess = new CreateFolderProcessImpl();
        assertDoesNotThrow(() -> {
            FolderDto folder = createFolderProcess.createFolder("qwerty");
            assertWithMessage("Folder should not be null.").that(folder).isNotNull();
        }, "Should not throw FileNotFoundException because of nonexistent parent folder.");
    }
}