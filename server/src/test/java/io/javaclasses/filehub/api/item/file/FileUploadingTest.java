package io.javaclasses.filehub.api.item.file;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.item.folder.FolderNotFoundException;
import io.javaclasses.filehub.api.item.folder.ForbiddenAccessToFolderException;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.item.file.FileContentStorage;
import io.javaclasses.filehub.storage.item.file.FileMetadataRecord;
import io.javaclasses.filehub.storage.item.file.FileMetadataStorage;
import io.javaclasses.filehub.storage.item.file.FileSize;
import io.javaclasses.filehub.storage.item.file.MimeType;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("FileUploading should ")
class FileUploadingTest {

    private static class MockFileMetadataStorageCreator {
        private boolean isAddCalled = false;

        private FileMetadataStorage create() {
            return new FileMetadataStorage() {
                @Override
                public synchronized void add(FileMetadataRecord record) {
                    isAddCalled = true;
                }
            };
        }

        private boolean isAddCalled() {
            return isAddCalled;
        }
    }

    private FolderMetadataStorage mockFolderStorageWith(FolderMetadataRecord recordToBeAlwaysFound) {
        return new FolderMetadataStorage() {
            @Override
            public synchronized Optional<FolderMetadataRecord> find(FolderId id) {
                return Optional.ofNullable(recordToBeAlwaysFound);
            }
        };
    }

    private FolderMetadataRecord createFolderWith(FolderId id, UserId ownerId) {
        return new FolderMetadataRecord(
                id,
                new FileSystemItemName("sdg"),
                ownerId,
                new FolderId("sijgiojodf"));
    }

    private UploadFile createCommandWith(FolderId parentFolderId, UserId ownerId) {
        return new UploadFile(
                new UploadingFileInfo(new FileSystemItemName("fsad"),
                        new FileSize(30), new MimeType("image/png"), new byte[]{}),
                parentFolderId,
                ownerId);
    }

    @DisplayName("not accept null parameters to constructor and method.")
    @Test
    void testNullParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(FileUploading.class);
        tester.testAllPublicInstanceMethods(
                new FileUploading(new FolderMetadataStorage(), new FileMetadataStorage(), new FileContentStorage()));
    }

    @DisplayName("upload file.")
    @Test
    void testFileUploading() {
        FolderId destinationFolderId = new FolderId("qwerty123");
        UserId expectedOwnerId = new UserId("zxcvbn123");
        FolderMetadataRecord destinationFolder = createFolderWith(destinationFolderId, expectedOwnerId);
        UploadFile command = createCommandWith(destinationFolderId, expectedOwnerId);

        MockFileMetadataStorageCreator mockFileStorageCreator = new MockFileMetadataStorageCreator();
        FileMetadataStorage mockFileMetadataStorage = mockFileStorageCreator.create();
        FolderMetadataStorage mockFolderStorage = mockFolderStorageWith(destinationFolder);

        FileUploading process = new FileUploading(mockFolderStorage, mockFileMetadataStorage, new FileContentStorage());

        FileDto uploadedFile = process.handle(command);

        assertWithMessage("The DTO of the created file was not returned.")
                .that(uploadedFile)
                .isNotNull();

        assertWithMessage("Contract between process and file storage is broken.")
                .that(mockFileStorageCreator.isAddCalled())
                .isTrue();
    }

    @DisplayName("fail file uploading because of not existing destination folder.")
    @Test
    void testUploadToNotExistingFolder() {
        FolderId destinationFolderId = new FolderId("qwerty123");
        UserId expectedOwnerId = new UserId("zxcvbn123");
        UploadFile command = createCommandWith(destinationFolderId, expectedOwnerId);

        MockFileMetadataStorageCreator mockFileStorageCreator = new MockFileMetadataStorageCreator();

        FolderMetadataStorage mockFolderStorage = mockFolderStorageWith(null);

        FileUploading process = new FileUploading(mockFolderStorage, mockFileStorageCreator.create(), new FileContentStorage());

        assertThrows(FolderNotFoundException.class,
                () -> process.handle(command),
                "The uploading did not failed although destination folder is not found.");

        assertWithMessage("File is added to not existing folder, but should not have been.")
                .that(mockFileStorageCreator.isAddCalled())
                .isFalse();
    }

    @DisplayName("fail file uploading because the user is not the owner of the destination folder.")
    @Test
    void testUploadToFolderOfAnotherUser() {
        FolderId destinationFolderId = new FolderId("qwerty123");
        UserId expectedOwnerId = new UserId("zxcvbn123");
        UserId anotherOwnerId = new UserId("ouifosido");
        FolderMetadataRecord destinationFolder = createFolderWith(destinationFolderId, anotherOwnerId);
        UploadFile command = createCommandWith(destinationFolderId, expectedOwnerId);

        MockFileMetadataStorageCreator mockFileStorageCreator = new MockFileMetadataStorageCreator();

        FolderMetadataStorage mockFolderStorage = mockFolderStorageWith(destinationFolder);

        FileUploading process = new FileUploading(mockFolderStorage, mockFileStorageCreator.create(), new FileContentStorage());

        assertThrows(ForbiddenAccessToFolderException.class,
                () -> process.handle(command),
                "The uploading did not failed although destination folder does not belong to the user.");

        assertWithMessage("File is added to folder of another user, but should not have been.")
                .that(mockFileStorageCreator.isAddCalled())
                .isFalse();
    }
}
