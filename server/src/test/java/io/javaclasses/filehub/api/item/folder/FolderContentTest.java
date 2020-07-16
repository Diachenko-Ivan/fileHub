package io.javaclasses.filehub.api.item.folder;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.item.file.FileDto;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.item.file.FileId;
import io.javaclasses.filehub.storage.item.file.FileMetadataRecord;
import io.javaclasses.filehub.storage.item.file.FileSize;
import io.javaclasses.filehub.storage.item.file.MimeType;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("FolderContent should ")
class FolderContentTest {

    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(FolderContent.class);
    }

    private FolderDto createFolderDtoWith(String folderName) {
        return new FolderDto(new FolderMetadataRecord(
                new FolderId("id"),
                new FileSystemItemName(folderName),
                new UserId("asf"),
                new FolderId("fsd")
        ));
    }

    private FileDto createFileDtoWith(String fileName) {
        return new FileDto(new FileMetadataRecord(
                new FileId("id"),
                new FileSystemItemName(fileName),
                new FolderId("fsd"),
                new UserId("asf"),
                new MimeType("image/png"),
                new FileSize(34)
        ));
    }


    private FolderDto[] unsortedFolders() {
        return new FolderDto[]{
                createFolderDtoWith("Lkfsdbh"),
                createFolderDtoWith("Aofso"),
                createFolderDtoWith("9767rwkjk"),
                createFolderDtoWith("Zwoferoi"),
                createFolderDtoWith("hfuehbrf"),
                createFolderDtoWith("bleefoefjo"),
        };
    }

    private FolderDto[] sortedFolders() {
        return new FolderDto[]{
                createFolderDtoWith("9767rwkjk"),
                createFolderDtoWith("Aofso"),
                createFolderDtoWith("bleefoefjo"),
                createFolderDtoWith("hfuehbrf"),
                createFolderDtoWith("Lkfsdbh"),
                createFolderDtoWith("Zwoferoi"),

        };
    }

    private FileDto[] unsortedFiles() {
        return new FileDto[]{
                createFileDtoWith("dfjsijo.jpeg"),
                createFileDtoWith("!kjdks.html"),
                createFileDtoWith("9767rwkjk.doc"),
                createFileDtoWith("Ajdfoe.html"),
                createFileDtoWith("AAjdskk.pdf"),
        };
    }

    private FileDto[] sortedFiles() {
        return new FileDto[]{
                createFileDtoWith("dfjsijo.jpeg"),
                createFileDtoWith("!kjdks.html"),
                createFileDtoWith("9767rwkjk.doc"),
                createFileDtoWith("Ajdfoe.html"),
                createFileDtoWith("AAjdskk.pdf"),
        };
    }

    @DisplayName("correctly sort files and folders.")
    @Test
    void testSortedFilesAndFolder() {
        FolderContent folderContent = new FolderContent(unsortedFolders(), unsortedFiles());
        assertWithMessage("Files are not sorted correctly.")
                .that(Set.of(folderContent.childFiles()))
                .containsExactly((Object[]) sortedFiles());

        assertWithMessage("Folders are not sorted correctly.")
                .that(Set.of(folderContent.childFolders()))
                .containsExactly((Object[]) sortedFolders());
    }

}
