package io.javaclasses.filehub.web.item.file;

import io.javaclasses.filehub.web.item.ItemDto;

/**
 * Represents file and used for further serialization into JSON.
 */
public class FileDto extends ItemDto {
    /**
     * File mime type.
     */
    private String mimeType;
    /**
     * File size.
     */
    private long size;

    /**
     * Creates new {@link FileDto} instance.
     *
     * @param id       file id.
     * @param name     file name.
     * @param parentId id of parent folder.
     * @param mimeType file mime type.
     * @param size     file size.
     */
    public FileDto(String id, String name, String parentId, String mimeType, long size) {
        super(id, name, parentId);
        this.mimeType = mimeType;
        this.size = size;
        this.type = "file";
    }

    /**
     * Returns file mime type.
     *
     * @return file mime type.
     */
    public String mimeType() {
        return mimeType;
    }

    /**
     * Sets new mime type.
     *
     * @param mimeType mime type value.
     */
    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    /**
     * Returns file size.
     *
     * @return file size in bytes.
     */
    public long size() {
        return size;
    }

    /**
     * Sets new file size.
     *
     * @param size number of bytes.
     */
    public void setSize(long size) {
        this.size = size;
    }
}
