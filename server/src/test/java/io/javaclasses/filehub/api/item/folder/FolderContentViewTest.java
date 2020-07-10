package io.javaclasses.filehub.api.item.folder;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.item.file.FileMetadataStorage;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

class FolderContentViewTest {
    private FolderMetadataStorage mockFolderStorageWith(FolderMetadataRecord recordToBeFoundAlways) {
        return new FolderMetadataStorage() {
            @Override
            public synchronized Optional<FolderMetadataRecord> find(FolderId id, UserId ownerId) {
                return Optional.ofNullable(recordToBeFoundAlways);
            }
        };
    }

    private FolderMetadataRecord createDefaultFolder() {
        return new FolderMetadataRecord(
                new FolderId("afsdfas"),
                new FileSystemItemName("sdg"),
                new UserId("isdgiufgiu"),
                new FolderId("sijgiojodf"));
    }

    @DisplayName("not accept null parameters to constructor and method.")
    @Test
    void testNullParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(FolderContentView.class);
        tester.testAllPublicInstanceMethods(new FolderContentView(new FolderMetadataStorage(), new FileMetadataStorage()));
    }

    @DisplayName("return folder content.")
    @Test
    void testReturnOfFolderContent() {
        FolderMetadataRecord expectedFolder = createDefaultFolder();
        FolderMetadataStorage mockFolderStorage = mockFolderStorageWith(expectedFolder);

        FolderContentView view = new FolderContentView(mockFolderStorage, new FileMetadataStorage());

        FolderContent folderContent =
                view.process(new GetFolderContent(new FolderId("afsdfas"), new UserId("jsdf")));

        assertWithMessage("Folder was not found although it exists.")
                .that(folderContent)
                .isNotNull();
    }

    @DisplayName("fail to retrieve content of not existing folder.")
    @Test
    void testReceiveOfNotExistingFolder() {
        FolderMetadataStorage mockFolderStorage = mockFolderStorageWith(null);

        FolderContentView view = new FolderContentView(mockFolderStorage, new FileMetadataStorage());

        assertThrows(NotFoundException.class,
                () -> view.process(new GetFolderContent(new FolderId("sdf"), new UserId("jsdf"))),
                "The exception was not thrown although folder does not exist.");
    }
}
