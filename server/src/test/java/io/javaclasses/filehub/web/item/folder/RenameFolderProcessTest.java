package io.javaclasses.filehub.web.item.folder;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("RenameFolderProcess should ")
class RenameFolderProcessTest {

    @DisplayName("rename existent folder.")
    @Test
    void testSuccessfulFolderRename() {
        RenameFolderProcess renameFolderProcess = new RenameFolderProcessImpl();
        assertDoesNotThrow(() -> {
            FolderDto renamedFolder = renameFolderProcess.rename(new FolderDto("qwe", "docs", "123", 2));
            assertWithMessage("Renamed folder DTO should not be null.").that(renamedFolder).isNotNull();
        }, "Should not throw FileNotFoundException because folder exists.");
    }
}