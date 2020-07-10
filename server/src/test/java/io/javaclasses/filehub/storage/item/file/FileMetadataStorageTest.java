package io.javaclasses.filehub.storage.item.file;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("FileMetadataStorage should ")
class FileMetadataStorageTest {
    @DisplayName("not accept null parameters to methods.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(UserId.class, new UserId("24"));
        tester.setDefault(FolderId.class, new FolderId("sdsd"));
        tester.testAllPublicInstanceMethods(new FileMetadataStorage());
    }

    private FileMetadataStorage prepareFolderStorage(FileMetadataRecord... records) {
        FileMetadataStorage folderMetadataStorage = new FileMetadataStorage();
        for (FileMetadataRecord record : records) {
            folderMetadataStorage.add(record);
        }
        return folderMetadataStorage;
    }

    private FileMetadataRecord createFileMetadataWith(FileId id, FolderId parentFolderId) {
        return new FileMetadataRecord(
                id,
                new FileSystemItemName("sdg"),
                parentFolderId,
                new UserId("sdfsdg"),
                new MimeType("image/png"),
                new FileSize(345));
    }

    private FileMetadataStorage prepareStorageForSearchByParentFolderId() {
        return prepareFolderStorage(
                createFileMetadataWith(new FileId("4"), new FolderId("1")),
                createFileMetadataWith(new FileId("8"), new FolderId("4")),
                createFileMetadataWith(new FileId("6"), new FolderId("1")),
                createFileMetadataWith(new FileId("2"), new FolderId("6"))
        );
    }

    @DisplayName("find files by parent folder identifier.")
    @Test
    void testSearchByParentFolderId() {
        FileMetadataRecord firstFoundFile =
                createFileMetadataWith(new FileId("4"), new FolderId("1"));
        FileMetadataRecord secondFoundFile =
                createFileMetadataWith(new FileId("6"), new FolderId("1"));

        FileMetadataStorage fileMetadataStorage = prepareStorageForSearchByParentFolderId();
        FolderId parentFolderId = new FolderId("1");

        Set<FileMetadataRecord> foundFiles = fileMetadataStorage.findAll(parentFolderId);

        assertWithMessage("The set size of found files is incorrect.")
                .that(foundFiles.size())
                .isEqualTo(2);

        assertWithMessage("The set contains incorrect records.")
                .that(foundFiles)
                .containsExactly(firstFoundFile, secondFoundFile);
    }
}
