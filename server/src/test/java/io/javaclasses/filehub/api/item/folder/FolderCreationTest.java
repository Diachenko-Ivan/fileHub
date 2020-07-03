package io.javaclasses.filehub.api.item.folder;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.item.folder.FileItemCount;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.annotation.Nullable;
import java.util.Optional;
import java.util.Set;

import static com.google.common.truth.Truth.assertWithMessage;
import static java.util.Collections.emptySet;
import static java.util.Set.of;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("FolderCreation should ")
class FolderCreationTest {

    private FolderMetadataStorage mockFolderStorage(FolderMetadataRecord findResult,
                                                    Set<FolderMetadataRecord> findAllResult,
                                                    boolean[] isAddCalled) {
        return new FolderMetadataStorage() {
            @Override
            public Optional<FolderMetadataRecord> find(FolderId id) {
                return Optional.ofNullable(findResult);
            }

            @Override
            public Set<FolderMetadataRecord> findAll(@Nullable FolderId parentFolderId) {
                return findAllResult;
            }

            @Override
            public synchronized void add(FolderMetadataRecord record) {
                isAddCalled[0] = true;
            }
        };
    }

    private FolderMetadataRecord createFolder(FolderId folderId, UserId folderOwnerId) {
        return new FolderMetadataRecord(
                folderId,
                new ItemName("sdg"),
                folderOwnerId,
                new FileItemCount(0),
                new FolderId("sijgiojodf"));
    }

    @DisplayName("not accept null parameters to constructor and method.")
    @Test
    void testNullParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(FolderCreation.class);
        tester.testAllPublicInstanceMethods(new FolderCreation(new FolderMetadataStorage()));
    }

    @DisplayName("create root folder.")
    @Test
    void testRootFolderCreation() {
        boolean[] isAddCalled = {false};

        FolderMetadataStorage mockFolderStorage = mockFolderStorage(null, emptySet(), isAddCalled);
        FolderCreation folderCreation = new FolderCreation(mockFolderStorage);

        FolderMetadataRecord createdRootFolder =
                folderCreation.createFolder(new CreateFolder(new UserId("RandomId"), null));

        assertWithMessage("Created root folder is null.")
                .that(createdRootFolder)
                .isNotNull();
        assertWithMessage("The add method from folder storage was not called.")
                .that(isAddCalled[0])
                .isTrue();
        assertWithMessage("Parent folder identifier in root folder is not null")
                .that(createdRootFolder.parentFolderId())
                .isNull();
    }

    @DisplayName("throw IllegalArgumentException is user already has a root folder.")
    @Test
    void testUnsuccessfulRootFolderCreation() {
        boolean[] isAddCalled = {false};
        UserId equalOwnerId = new UserId("RandomId");

        FolderMetadataStorage mockFolderStorage = mockFolderStorage(null,
                of(createFolder(new FolderId("123"), equalOwnerId)), isAddCalled);

        FolderCreation folderCreation = new FolderCreation(mockFolderStorage);

        assertThrows(IllegalArgumentException.class,
                () -> folderCreation.createFolder(new CreateFolder(equalOwnerId, null)),
                "The IllegalArgumentException was not thrown bust must, because user already has root folder.");

        assertWithMessage("The add method from folder storage was called but must not.")
                .that(isAddCalled[0])
                .isFalse();
    }

    @DisplayName("throw ItemIsNotFoundException if parent folder is not found.")
    @Test
    void testFolderDoesNotExist() {
        boolean[] isAddCalled = {false};

        FolderMetadataStorage mockFolderStorage = mockFolderStorage(null,
                of(createFolder(new FolderId("123"), new UserId("owner-id"))), isAddCalled);

        FolderCreation folderCreation = new FolderCreation(mockFolderStorage);

        assertThrows(ItemIsNotFoundException.class,
                () -> folderCreation.createFolder(new CreateFolder(new UserId("owner-id"), new FolderId("nonexistent-folder-id"))),
                "The ItemIsNotFoundException was not thrown bust must, because parent folder was not found.");

        assertWithMessage("The add method from folder storage was called but must not.")
                .that(isAddCalled[0])
                .isFalse();
    }

    @DisplayName("create inner folder.")
    @Test
    void testInnerFolderCreation() {
        boolean[] isAddCalled = {false};
        UserId equalOwnerId = new UserId("RandomId");
        FolderId equalParentFolderId = new FolderId("folder-id");

        FolderMetadataStorage mockFolderStorage =
                mockFolderStorage(createFolder(equalParentFolderId, equalOwnerId), emptySet(), isAddCalled);

        FolderCreation folderCreation = new FolderCreation(mockFolderStorage);

        FolderMetadataRecord innerFolder =
                folderCreation.createFolder(new CreateFolder(equalOwnerId, equalParentFolderId));

        assertWithMessage("Created folder is null.")
                .that(innerFolder)
                .isNotNull();
        assertWithMessage("The add method from folder storage was not called.")
                .that(isAddCalled[0])
                .isTrue();

        assertWithMessage("Parent folder identifier is incorrect.")
                .that(innerFolder.parentFolderId())
                .isEqualTo(equalParentFolderId);
    }
}
