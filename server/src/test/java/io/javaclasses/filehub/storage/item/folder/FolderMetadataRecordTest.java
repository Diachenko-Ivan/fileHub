package io.javaclasses.filehub.storage.item.folder;

import com.google.common.testing.EqualsTester;
import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("FolderMetadataRecord should ")
class FolderMetadataRecordTest {

    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(FileSystemItemName.class, new FileSystemItemName("id"));
        tester.setDefault(FolderId.class, new FolderId("ksdf"));
        tester.setDefault(UserId.class, new UserId("sdfs"));
        tester.testAllPublicConstructors(FolderMetadataRecord.class);
    }

    @DisplayName("implement correct equal and hashcode methods.")
    @Test
    public void testEqualsContract() {
        new EqualsTester()
                .addEqualityGroup(createFolder("1"), createFolder("1"))
                .addEqualityGroup(createFolder("2"))
                .testEquals();
    }

    private FolderMetadataRecord createFolder(String folderIdValue) {
        return new FolderMetadataRecord(
                new FolderId(folderIdValue),
                new FileSystemItemName("sdg"),
                new UserId("sdfsdg"),
                new FolderId("sijgiojodf"));
    }

}
