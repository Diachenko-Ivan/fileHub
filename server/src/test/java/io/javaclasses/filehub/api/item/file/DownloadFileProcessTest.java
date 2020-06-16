package io.javaclasses.filehub.api.item.file;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.File;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("DownloadFileProcess should ")
class DownloadFileProcessTest {

    @DisplayName("successfully download existent file.")
    @Test
    void testFileDownload() {
        DownloadFileProcess downloadFileProcess = new DownloadFileProcessImpl();
        File file = downloadFileProcess.download("qwerty");
        assertWithMessage("File must not be null because it exists.").that(file).isNotNull();
    }
}