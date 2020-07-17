package io.javaclasses.filehub.api.item.file;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.item.file.FileSize;
import io.javaclasses.filehub.storage.item.file.MimeType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("UploadingFileInfo should ")
class UploadingFileInfoTest {
    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        nullPointerTester().testAllPublicConstructors(UploadingFileInfo.class);
    }

    private NullPointerTester nullPointerTester() {
        return new NullPointerTester()
                .setDefault(FileSystemItemName.class, new FileSystemItemName("fsad"))
                .setDefault(FileSize.class, new FileSize(30))
                .setDefault(MimeType.class, new MimeType("image/png"));
    }
}
