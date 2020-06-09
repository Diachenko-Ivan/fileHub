package io.javaclasses.filehub.web.item.folder;

import io.javaclasses.filehub.web.item.ItemDto;
import io.javaclasses.filehub.web.item.file.FileDto;

import java.io.File;

/**
 * Represents folder.
 */
public class FolderDto extends ItemDto {
    /**
     * Number of items in the folder.
     */
    private long filesCount;

    /**
     * Creates new {@link FolderDto} instance.
     *
     * @param id         file id.
     * @param name       file name.
     * @param parentId   id of parent folder.
     * @param filesCount numbers of items in.
     */
    public FolderDto(String id, String name, String parentId, long filesCount) {
        super(id, name, parentId);
        this.filesCount = filesCount;
        this.type = "folder";
    }

    public long filesCount() {
        return filesCount;
    }

    public void setFilesCount(long filesCount) {
        this.filesCount = filesCount;
    }

    public String type() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
