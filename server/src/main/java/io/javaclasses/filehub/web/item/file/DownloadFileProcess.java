package io.javaclasses.filehub.web.item.file;

import java.io.File;

/**
 * Used for client file download.
 */
public interface DownloadFileProcess {
    /**
     * Downloads file depending on its id that is equal to {@code fileId}.
     * <p>If file does not exist method returns <i>null</i>.
     *
     * @param fileId id of file that is going to be downloaded.
     * @return client file.
     */
    File download(String fileId);
}
