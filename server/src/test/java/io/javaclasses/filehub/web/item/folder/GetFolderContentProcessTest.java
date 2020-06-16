package io.javaclasses.filehub.web.item.folder;

import io.javaclasses.filehub.web.item.ItemDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("GetFolderContentProcess should ")
class GetFolderContentProcessTest {

    @DisplayName("return content of folder with correct id.")
    @Test
    void testSuccessfulGettingOfFolderContent() {
        GetFolderContentProcess folderContentProcess = new GetFolderContentProcessImpl();
        ItemDto[] items = folderContentProcess.content("folderId");
        assertWithMessage("Should contain array of items.").that(items).isNotNull();
    }
}