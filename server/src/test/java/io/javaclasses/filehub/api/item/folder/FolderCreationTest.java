package io.javaclasses.filehub.api.item.folder;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
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

        private FolderMetadataStorage withRecord(FolderMetadataRecord recordToBeFoundAlways) {
            return new FolderMetadataStorage() {
                @Override
                public synchronized Optional<FolderMetadataRecord> find(FolderId id, UserId ownerId) {
                    return Optional.ofNullable(recordToBeFoundAlways);
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

    private FolderMetadataRecord createFolderWith(FolderId folderId, UserId folderOwnerId) {
        return new FolderMetadataRecord(
                folderId,
                new FileSystemItemName("sdg"),
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


    @DisplayName("fail the creation of sub-folder because parent folder is not found.")
    @Test
    void testCreationToNotExistingFolder() {
        MockFolderMetadataStorageCreator mockFolderStorageCreator = new MockFolderMetadataStorageCreator();
        FolderMetadataStorage mockFolderStorage = mockFolderStorageCreator.withRecord(null);

        FolderCreation folderCreation = new FolderCreation(mockFolderStorage);

        CreateFolder createFolderCommand =
                new CreateFolder(new FolderId("nonexistent-folder-id"), new UserId("defaultId"));

        assertThrows(NotFoundException.class,
                () -> folderCreation.handle(createFolderCommand),
                "The ItemIsNotFoundException was not thrown bust must, because parent folder was not found.");

        assertWithMessage("The add method from folder storage was called but must not.")
                .that(mockFolderStorageCreator.isAddCalled())
                .isFalse();
    }

    @DisplayName("create sub-folder.")
    @Test
    void testSubfolderCreation() {
        UserId expectedOwnerId = new UserId("RandomId");
        FolderId expectedParentFolderId = new FolderId("folder-id");

        MockFolderMetadataStorageCreator mockFolderStorageCreator = new MockFolderMetadataStorageCreator();
        FolderMetadataStorage mockFolderStorage = mockFolderStorageCreator
                .withRecord(createFolderWith(expectedParentFolderId, expectedOwnerId));

        FolderCreation folderCreation = new FolderCreation(mockFolderStorage);

        FolderDto subFolder =
                folderCreation.handle(new CreateFolder(expectedParentFolderId, expectedOwnerId));

        assertWithMessage("Cannot create folder.")
                .that(subFolder)
                .isNotNull();

        assertWithMessage("The contract between process and folder storage is broken.")
                .that(mockFolderStorageCreator.isAddCalled())
                .isTrue();

        assertWithMessage("Parent folder identifier is not set.")
                .that(subFolder.parentId())
                .isEqualTo(expectedParentFolderId.value());
    }
}
