package io.javaclasses.filehub.api.item.folder;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

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
                parentFolderId
        );
    }

    @DisplayName("accept non existing parent folder identifier.")
    @Test
    void testInstanceCreationWithNoParentId() {
        FolderMetadataRecord folderMetadata = createFolderMetadataWithParentId(null);

        FolderDto folderDto = new FolderDto(folderMetadata, 1);
        assertWithMessage("Parent folder identifier is not null.")
                .that(folderDto.parentId())
                .isNull();
    }

    @DisplayName("accept existing parent folder identifier.")
    @Test
    void testInstanceCreationWithParentId() {
        FolderMetadataRecord folderMetadata = createFolderMetadataWithParentId(new FolderId("asdasd"));

        FolderDto folderDto = new FolderDto(folderMetadata, 1);
        assertWithMessage("Parent folder identifier is null.")
                .that(folderDto.parentId())
                .isNotNull();
    }

    @DisplayName("not accept negative file item number value to constructor.")
    @Test
    void testNegativeNumberOfItems() {
        assertThrows(IllegalArgumentException.class, () ->
                        new FolderDto(createFolderMetadataWithParentId(null), -2),
                "Constructor did not throw exception because of incorrect value.");
    }

    @DisplayName("accept positive file item number value to constructor.")
    @Test
    void testPositiveNumberOfItems() {
        assertDoesNotThrow(() -> {
                    FolderDto folderDto = new FolderDto(createFolderMetadataWithParentId(null), 2);
                    assertWithMessage("Number of files is incorrect.")
                            .that(folderDto.fileItemCount())
                            .isEqualTo(2);
                },
                "Constructor threw an exception but value is correct.");
    }
}
