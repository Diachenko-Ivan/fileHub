package io.javaclasses.filehub.web.item.file;

import java.io.File;
import java.io.FileNotFoundException;

/**
 * Used for client file download.
 */
public interface DownloadFileService {
    /**
     * Downloads file depending on its id that is equal to {@code fileId}.
     *
     * @param fileId id of file that is going to be downloaded.
     * @return client file.
     * @throws FileNotFoundException if file with {@code fileId} is not found.
     */
    File download(String fileId) throws FileNotFoundException;
}
