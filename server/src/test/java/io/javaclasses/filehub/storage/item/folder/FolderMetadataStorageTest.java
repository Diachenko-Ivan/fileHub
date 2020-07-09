package io.javaclasses.filehub.storage.item.folder;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.Set;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("FolderMetadataStorage should ")
class FolderMetadataStorageTest {

    @DisplayName("not accept null parameters to methods.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(UserId.class, new UserId("24"));
        tester.setDefault(FolderId.class, new FolderId("sdsd"));
        tester.testAllPublicInstanceMethods(new FolderMetadataStorage());
    }

    private FolderId folderId(String value) {
        return new FolderId(value);
    }

    private UserId ownerId(String value) {
        return new UserId(value);
    }

    private FolderMetadataRecord createFolderWith(FolderId id,
                                                  FolderId parentId,
                                                  UserId ownerId) {
        return new FolderMetadataRecord(
                id,
                new FileSystemItemName("sdg"),
                ownerId,
                parentId);
    }

    private FolderMetadataStorage prepareFolderStorage(FolderMetadataRecord... records) {
        FolderMetadataStorage folderMetadataStorage = new FolderMetadataStorage();
        for (FolderMetadataRecord record : records) {
            folderMetadataStorage.add(record);
        }
        return folderMetadataStorage;
    }


    private FolderMetadataStorage prepareFolderStorageSearchTests() {
        return prepareFolderStorage(
                createFolderWith(folderId("1"), folderId("2"), ownerId("1")),
                createFolderWith(folderId("3"), folderId("5"), ownerId("1")),
                createFolderWith(folderId("5"), folderId("2"), ownerId("1"))
        );
    }

    @DisplayName("find folders by parent folder identifier.")
    @Test
    void testFindFoldersByParentId() {
        FolderMetadataRecord firstFoundFolder =
                createFolderWith(folderId("1"), folderId("2"), ownerId("1"));
        FolderMetadataRecord secondFoundFolder =
                createFolderWith(folderId("5"), folderId("2"), ownerId("1"));

        FolderMetadataStorage folderMetadataStorage = prepareFolderStorageSearchTests();
        FolderId parentFolderId = new FolderId("2");

        Set<FolderMetadataRecord> foundFolders = folderMetadataStorage.findAll(parentFolderId);

        assertWithMessage("The set size of found folders is incorrect.")
                .that(foundFolders.size())
                .isEqualTo(2);

        assertWithMessage("The set contains incorrect records.")
                .that(foundFolders)
                .containsExactly(firstFoundFolder, secondFoundFolder);
    }

    @DisplayName("find folder by its identifier and identifier of the owner.")
    @Test
    void testFindFolderByIdAndOwnerId() {
        FolderMetadataRecord expectedFolder = createFolderWith(folderId("1"), folderId("2"), ownerId("1"));
        FolderMetadataStorage folderMetadataStorage = prepareFolderStorageSearchTests();

        Optional<FolderMetadataRecord> actualFolder = folderMetadataStorage.find(new FolderId("1"), new UserId("1"));

        assertWithMessage("Found folder is wrong.")
                .that(actualFolder.orElse(null))
                .isEqualTo(expectedFolder);
    }

    @DisplayName("not find folder by its identifier and identifier of the owner if one of the parameters is incorrect.")
    @Test
    void testFindFolderByWrongOwnerId() {
        FolderMetadataStorage folderMetadataStorage = prepareFolderStorageSearchTests();

        Optional<FolderMetadataRecord> actualFolder = folderMetadataStorage.find(new FolderId("1"), new UserId("another"));

        assertWithMessage("The folder was found although the identifier of the owner is wrong.")
                .that(actualFolder.orElse(null))
                .isNull();
    }
}
