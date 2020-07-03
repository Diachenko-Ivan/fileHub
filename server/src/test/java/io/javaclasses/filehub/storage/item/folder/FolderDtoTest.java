package io.javaclasses.filehub.storage.item.folder;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("FolderDto should ")
class FolderDtoTest {

    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(FolderDto.class);
    }

    private FolderDto createFolderDto(FolderId parentFolderId) {
        return new FolderDto(new FolderMetadataRecord(
                new FolderId("id"),
                new ItemName("name"),
                new UserId("asf"),
                new FileItemCount(4),
                parentFolderId
        ));
    }

    @DisplayName("set parent folder identifier to null.")
    @Test
    void testParentFolderIdNullValue() {
        FolderDto folderDto = createFolderDto(null);
        assertWithMessage("Parent folder identifier is not null.")
                .that(folderDto.parentId())
                .isNull();
    }

    @DisplayName("set parent folder identifier to concrete folder id.")
    @Test
    void testParentFolderIdNotNullValue() {
        FolderDto folderDto = createFolderDto(new FolderId("asdasd"));
        assertWithMessage("Parent folder identifier is null.")
                .that(folderDto.parentId())
                .isNotNull();
    }
}
