package io.javaclasses.filehub.api.item.file;

import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.item.file.FileMetadataRecord;
import io.javaclasses.filehub.storage.item.file.FileSize;
import io.javaclasses.filehub.storage.item.file.MimeType;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The value object that contains information about the uploading file {@link FileMetadataRecord}.
 * <p>Used in {@link UploadFile} command.</p>
 */
public final class UploadingFileInfo {
    /**
     * A name of the file.
     */
    private final FileSystemItemName name;
    /**
     * File size in the bytes.
     */
    private final FileSize size;
    /**
     * Mime type for the file.
     */
    private final MimeType mimeType;
    /**
     * Content of the file in the byte array.
     */
    private final byte[] content;

    /**
     * Creates new UploadingFileInfo instance.
     *
     * @param name     file name.
     * @param size     file size.
     * @param mimeType mime type of the file.
     * @param content  file content.
     */
    public UploadingFileInfo(FileSystemItemName name, FileSize size, MimeType mimeType, byte[] content) {
        this.name = checkNotNull(name);
        this.size = checkNotNull(size);
        this.mimeType = checkNotNull(mimeType);
        this.content = checkNotNull(content);
    }

    /**
     * Returns file name.
     *
     * @return file name.
     */
    public FileSystemItemName name() {
        return name;
    }

    /**
     * Returns file size.
     *
     * @return file size.
     */
    public FileSize size() {
        return size;
    }

    /**
     * Returns mime type of the file.
     *
     * @return mime type.
     */
    public MimeType mimeType() {
        return mimeType;
    }

    /**
     * Returns the content of the file.
     *
     * @return content.
     */
    public byte[] content() {
        return content;
    }
}
