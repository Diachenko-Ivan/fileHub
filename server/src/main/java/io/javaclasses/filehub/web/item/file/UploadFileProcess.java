package io.javaclasses.filehub.web.item.file;

import java.io.File;
import java.io.FileNotFoundException;

/**
 * Used for uploading file into folder.
 */
public interface UploadFileProcess {
    /**
     * Uploads {@code file} into folder with id {@code folderId}
     *
     * @param file     uploaded file.
     * @param folderId id of destination folder.
     * @return model of uploaded file.
     * @throws FileNotFoundException if folder with {@code folderId} is not found.
     */
    FileDto upload(File file, String folderId) throws FileNotFoundException;
}
