package io.javaclasses.filehub.api.item.folder;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("FolderCreation should ")
class FolderCreationTest {

    private static class MockFolderMetadataStorageCreator {
        private boolean isAddCalled = false;

        private FolderMetadataStorage createWithFindResult(FolderMetadataRecord findResult) {
            return new FolderMetadataStorage() {
                @Override
                public synchronized Optional<FolderMetadataRecord> find(FolderId id) {
                    return Optional.ofNullable(findResult);
                }

                @Override
                public synchronized void add(FolderMetadataRecord record) {
                    isAddCalled = true;
                }
            };
        }

        private boolean isAddCalled() {
            return isAddCalled;
        }
    }

    private FolderMetadataRecord createFolderWithFolderIdAndOwnerId(FolderId folderId, UserId folderOwnerId) {
        return new FolderMetadataRecord(
                folderId,
                new ItemName("sdg"),
                folderOwnerId,
                new FolderId("sijgiojodf"));
    }

    @DisplayName("not accept null parameters to constructor and method.")
    @Test
    void testNullParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(FolderCreation.class);
        tester.testAllPublicInstanceMethods(new FolderCreation(new FolderMetadataStorage()));
    }


    @DisplayName("fail the creation of inner folder because parent folder is not found.")
    @Test
    void testAddToNonExistingFolder() {
        MockFolderMetadataStorageCreator mockCreator = new MockFolderMetadataStorageCreator();
        FolderMetadataStorage mockFolderStorage = mockCreator.createWithFindResult(null);

        FolderCreation folderCreation = new FolderCreation(mockFolderStorage);

        CreateFolder createFolderCommand =
                new CreateFolder(new FolderId("nonexistent-folder-id"), new UserId("defaultId"));

        assertThrows(ItemIsNotFoundException.class,
                () -> folderCreation.handle(createFolderCommand),
                "The ItemIsNotFoundException was not thrown bust must, because parent folder was not found.");

        assertWithMessage("The add method from folder storage was called but must not.")
                .that(mockCreator.isAddCalled())
                .isFalse();
    }

    @DisplayName("create inner folder.")
    @Test
    void testInnerFolderCreation() {
        UserId equalOwnerId = new UserId("RandomId");
        FolderId equalParentFolderId = new FolderId("folder-id");

        MockFolderMetadataStorageCreator mockCreator = new MockFolderMetadataStorageCreator();
        FolderMetadataStorage mockFolderStorage = mockCreator
                .createWithFindResult(createFolderWithFolderIdAndOwnerId(equalParentFolderId, equalOwnerId));

        FolderCreation folderCreation = new FolderCreation(mockFolderStorage);

        FolderDto innerFolder =
                folderCreation.handle(new CreateFolder(equalParentFolderId, equalOwnerId));

        assertWithMessage("Created folder is null.")
                .that(innerFolder)
                .isNotNull();

        assertWithMessage("The add method from folder storage was not called.")
                .that(mockCreator.isAddCalled())
                .isTrue();

        assertWithMessage("Parent folder identifier is incorrect.")
                .that(innerFolder.parentId())
                .isEqualTo(equalParentFolderId.value());
    }
}
