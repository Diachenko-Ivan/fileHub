package io.javaclasses.filehub.web.item.file;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.File;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("UploadFileProcess should ")
class UploadFileProcessTest {

    @DisplayName("upload file to existent folder.")
    @Test
    void testFileUpload() {
        UploadFileProcess uploadFileProcess = new UploadFileProcessImpl();
        assertDoesNotThrow(() -> {
            FileDto fileDto = uploadFileProcess.upload(new File("/default/path"), "qwerty");
            assertWithMessage("File DTO should not be null").that(fileDto).isNotNull();
        }, "Should not throw FileNotFoundException because destination folder already exist.");
    }
}