package io.javaclasses.filehub.storage.item.folder;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("FolderMetadataStorage should ")
class FolderMetadataStorageTest {

    @DisplayName("not accept null parameters to methods.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicInstanceMethods(new FolderMetadataStorage());
    }

    private FolderId folderId(String value) {
        return new FolderId(value);
    }

    private UserId ownerId(String value) {
        return new UserId(value);
    }

    private FolderMetadataRecord createFolderWithFolderIdAndParentIdAndOwnerId(FolderId folderId,
                                                                               FolderId parentId,
                                                                               UserId ownerId) {
        return new FolderMetadataRecord(
                folderId,
                new ItemName("sdg"),
                ownerId,
                new FileItemCount(0),
                parentId);
    }

    private FolderMetadataStorage prepareFolderStorage(FolderMetadataRecord... records) {
        FolderMetadataStorage folderMetadataStorage = new FolderMetadataStorage();
        for (FolderMetadataRecord record : records) {
            folderMetadataStorage.add(record);
        }
        return folderMetadataStorage;
    }


    private FolderMetadataStorage prepareFolderStorageForFindByParentIdTest() {
        return prepareFolderStorage(
                createFolderWithFolderIdAndParentIdAndOwnerId(folderId("1"), folderId("2"), ownerId("1")),
                createFolderWithFolderIdAndParentIdAndOwnerId(folderId("3"), folderId("5"), ownerId("1")),
                createFolderWithFolderIdAndParentIdAndOwnerId(folderId("5"), folderId("2"), ownerId("1"))
        );
    }

    @DisplayName("find folders by parent folder identifier.")
    @Test
    void testFindFoldersByParentId() {
        FolderMetadataStorage folderMetadataStorage = prepareFolderStorageForFindByParentIdTest();
        FolderId parentFolderId = new FolderId("2");

        assertWithMessage("The set size of found folders is incorrect.")
                .that(folderMetadataStorage.findAll(parentFolderId).size())
                .isEqualTo(2);
    }

    @DisplayName("find the root folder for the owner.")
    @Test
    void testFindRootFolder() {
        FolderId rootFolderId = folderId("jsgndfndnobdnfo");
        UserId ownerId = ownerId("jksgdfjngod");

        FolderMetadataStorage folderMetadataStorage = prepareFolderStorage(
                createFolderWithFolderIdAndParentIdAndOwnerId(rootFolderId, null, ownerId)
        );

        FolderMetadataRecord rootFolder = folderMetadataStorage.findRoot(ownerId).orElse(null);

        assertWithMessage("The root folder is not found.")
                .that(rootFolder)
                .isNotNull();

        assertWithMessage("The root folder owner identifier is not equal.")
                .that(rootFolder.ownerId())
                .isEqualTo(ownerId);
    }
}
