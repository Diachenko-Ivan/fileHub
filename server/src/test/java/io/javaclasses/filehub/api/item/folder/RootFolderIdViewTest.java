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

@DisplayName("RootFolderIdView should ")
class RootFolderIdViewTest {

    @DisplayName("not accept null parameters to constructor and method.")
    @Test
    void testNullParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(RootFolderIdView.class);
        tester.testAllPublicInstanceMethods(new RootFolderIdView(new FolderMetadataStorage()));
    }

    private FolderMetadataStorage mockFolderStorageWithRootFolder(FolderMetadataRecord folderMetadata) {
        return new FolderMetadataStorage() {
            @Override
            public synchronized Optional<FolderMetadataRecord> findRoot(UserId ownerId) {
                return Optional.ofNullable(folderMetadata);
            }
        };
    }

    private FolderMetadataRecord createDefaultFolderMetadata() {
        return new FolderMetadataRecord(
                new FolderId("afsdfas"),
                new FileSystemItemName("sdg"),
                new UserId("isdgiufgiu"),
                new FolderId("sijgiojodf"));
    }

    @DisplayName("return the root folder identifier.")
    @Test
    void testReturnOfRootFolderId() {
        FolderMetadataStorage mockFolderMetadataStorage = mockFolderStorageWithRootFolder(createDefaultFolderMetadata());
        RootFolderIdView rootFolderIdView = new RootFolderIdView(mockFolderMetadataStorage);

        FolderId rootFolderId = rootFolderIdView.process(new GetRootFolderId(new UserId("isdgiufgiu")));

        assertWithMessage("The root folder is null.")
                .that(rootFolderId)
                .isNotNull();
    }

    @DisplayName("fail the return of the root folder.")
    @Test
    void testFailedReturnOfRootFolderId() {
        FolderMetadataStorage mockFolderMetadataStorage = mockFolderStorageWithRootFolder(null);
        RootFolderIdView rootFolderIdView = new RootFolderIdView(mockFolderMetadataStorage);

        assertThrows(NullPointerException.class,
                () -> rootFolderIdView.process(new GetRootFolderId(new UserId("isdgiufgiu"))),
                "An exception was not thrown although the root folder was not found.");
    }
}
