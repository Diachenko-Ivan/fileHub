package io.javaclasses.filehub.api.item.file;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("UploadFile should ")
class UploadFileTest {
    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        nullPointerTester().testAllPublicConstructors(UploadFile.class);
    }

    private static NullPointerTester nullPointerTester() {
        return new NullPointerTester()
                .setDefault(FolderId.class, new FolderId("ef"))
                .setDefault(UserId.class, new UserId("fjfs"))
                .setDefault(UploadingFileInfo.class,
                        new UploadingFileInfo("fsad", 30, "image/png", new byte[]{}));
    }
}
