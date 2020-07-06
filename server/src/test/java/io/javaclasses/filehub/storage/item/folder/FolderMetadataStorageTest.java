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

    private FolderMetadataRecord createFolder(String folderIdValue, String parentFolderIdValue) {
        return new FolderMetadataRecord(
                new FolderId(folderIdValue),
                new ItemName("sdg"),
                new UserId("sdfsdg"),
                new FileItemCount(0),
                new FolderId(parentFolderIdValue));
    }

    private FolderMetadataStorage prepareFolderStorage() {
        FolderMetadataStorage folderMetadataStorage = new FolderMetadataStorage();
        folderMetadataStorage.add(createFolder("1", "2"));
        folderMetadataStorage.add(createFolder("3", "5"));
        folderMetadataStorage.add(createFolder("5", "2"));
        folderMetadataStorage.add(createFolder("2", "3"));
        return folderMetadataStorage;
    }

    @DisplayName("find folders by parent folder identifier.")
    @Test
    void testFindFoldersByParentId() {
        FolderMetadataStorage folderMetadataStorage = prepareFolderStorage();
        FolderId parentFolderId = new FolderId("2");

        assertWithMessage("The set size of found folders is incorrect.")
                .that(folderMetadataStorage.findAll(parentFolderId).size())
                .isEqualTo(2);
    }
}
