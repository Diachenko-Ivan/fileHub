package io.javaclasses.filehub.api.item.file;

import io.javaclasses.filehub.storage.item.file.FileMetadataRecord;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The value object that contains information about the uploading file {@link FileMetadataRecord}.
 * <p>Used in {@link UploadFile} command.</p>
 */
public final class UploadingFileInfo {
    /**
     * A name of the file.
     */
    private final String name;
    /**
     * File size in the bytes.
     */
    private final long size;
    /**
     * Mime type for the file.
     */
    private final String mimeType;
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
    public UploadingFileInfo(String name, long size, String mimeType, byte[] content) {
        checkArgument(size >= 0, "File size can not be negative.");
        this.name = checkNotNull(name);
        this.size = size;
        this.mimeType = checkNotNull(mimeType);
        this.content = checkNotNull(content);
    }

    /**
     * Returns file name.
     *
     * @return file name.
     */
    public String name() {
        return name;
    }

    /**
     * Returns file size.
     *
     * @return file size.
     */
    public long size() {
        return size;
    }

    /**
     * Returns mime type of the file.
     *
     * @return mime type.
     */
    public String mimeType() {
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
