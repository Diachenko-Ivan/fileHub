package io.javaclasses.filehub.storage.item.file;

import com.google.common.testing.EqualsTester;
import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("FileContentRecord should ")
class FileContentRecordTest {

    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
         new NullPointerTester()
                 .setDefault(FileId.class, new FileId("asd"))
                 .testAllPublicConstructors(FileContentRecord.class);
    }

    @DisplayName("implement correct equal and hashcode methods.")
    @Test
    public void testEqualsContract() {
        new EqualsTester()
                .addEqualityGroup(createFileWith(new FileId("1")), createFileWith(new FileId("1")))
                .addEqualityGroup(createFileWith(new FileId("2")))
                .testEquals();
    }

    private static FileContentRecord createFileWith(FileId fileId) {
        return new FileContentRecord(
                fileId,
                new byte[]{});
    }
}
