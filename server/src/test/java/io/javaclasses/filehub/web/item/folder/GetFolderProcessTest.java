package io.javaclasses.filehub.web.item.folder;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("GetFolderProcess should ")
class GetFolderProcessTest {

    @DisplayName("return existent folder.")
    @Test
    void testSuccessfulGettingOfFolder() {
        GetFolderProcess folderProcess = new GetFolderProcessImpl();
        FolderDto folder = folderProcess.folder("folderId");
        assertWithMessage("Folder should not be null because it exists.").that(folder).isNotNull();
    }
}