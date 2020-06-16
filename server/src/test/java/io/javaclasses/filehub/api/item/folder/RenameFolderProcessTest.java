package io.javaclasses.filehub.api.item.folder;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

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