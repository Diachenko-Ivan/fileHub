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

@DisplayName("FolderView should ")
class FolderViewTest {

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
        tester.testAllPublicConstructors(FolderView.class);
        tester.testAllPublicInstanceMethods(new FolderView(new FolderMetadataStorage()));
    }

    @DisplayName("return existing folder.")
    @Test
    void testFolderReceive() {
        FolderMetadataRecord expectedFolder = createDefaultFolder();
        FolderMetadataStorage mockStorage = mockFolderStorageWith(expectedFolder);

        FolderView view = new FolderView(mockStorage);

        FolderDto foundFolder = view.process(new GetFolder(new FolderId("sdf"), new UserId("jsdf")));

        assertWithMessage("Folder was not found although it exists.")
                .that(foundFolder)
                .isNotNull();
    }

    @DisplayName("fail to retrieve not existing folder.")
    @Test
    void testReceiveOfNotExistingFolder() {
        FolderMetadataStorage mockStorage = mockFolderStorageWith(null);

        FolderView view = new FolderView(mockStorage);

        assertThrows(NotFoundException.class,
                () -> view.process(new GetFolder(new FolderId("sdf"), new UserId("jsdf"))),
                "The exception was not thrown although folder does not exist.");
    }
}
