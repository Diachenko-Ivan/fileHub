package io.javaclasses.filehub.api.item.folder;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.item.folder.FileItemCount;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
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

    private FolderMetadataRecord createFolderMetadataWithParentId(FolderId parentFolderId) {
        return new FolderMetadataRecord(
                new FolderId("id"),
                new ItemName("name"),
                new UserId("asf"),
                new FileItemCount(4),
                parentFolderId
        );
    }

    @DisplayName("accept non existing parent folder identifier.")
    @Test
    void testInstanceCreationWithNoParentId() {
        FolderMetadataRecord folderMetadata = createFolderMetadataWithParentId(null);

        FolderDto folderDto = new FolderDto(folderMetadata);
        assertWithMessage("Parent folder identifier is not null.")
                .that(folderDto.parentId())
                .isNull();
    }

    @DisplayName("accept existing parent folder identifier.")
    @Test
    void testInstanceCreationWithParentId() {
        FolderMetadataRecord folderMetadata = createFolderMetadataWithParentId(new FolderId("asdasd"));

        FolderDto folderDto = new FolderDto(folderMetadata);
        assertWithMessage("Parent folder identifier is null.")
                .that(folderDto.parentId())
                .isNotNull();
    }
}
