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

    public String mimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public long size() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public String type() {
        return type;
    }
}
