package io.javaclasses.filehub.storage.item.file;

import com.google.common.testing.EqualsTester;
import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("FileMetadataRecord should ")
class FileMetadataRecordTest {

    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(FileSystemItemName.class, new FileSystemItemName("id"));
        tester.setDefault(FolderId.class, new FolderId("ksdf"));
        tester.setDefault(UserId.class, new UserId("sdfs"));
        tester.setDefault(FileId.class, new FileId("sdfgfgh"));
        tester.setDefault(MimeType.class, new MimeType("image/png"));
        tester.setDefault(FileSize.class, new FileSize(34));
        tester.testAllPublicConstructors(FileMetadataRecord.class);
    }

    @DisplayName("implement correct equal and hashcode methods.")
    @Test
    public void testEqualsContract() {
        new EqualsTester()
                .addEqualityGroup(createFileWith(new FileId("1")), createFileWith(new FileId("1")))
                .addEqualityGroup(createFileWith(new FileId("2")))
                .testEquals();
    }

    private FileMetadataRecord createFileWith(FileId fileId) {
        return new FileMetadataRecord(
                fileId,
                new FileSystemItemName("sdg"),
                new FolderId("sijgiojodf"),
                new UserId("sdfsdg"),
                new MimeType("image/png"),
                new FileSize(345));
    }
}
