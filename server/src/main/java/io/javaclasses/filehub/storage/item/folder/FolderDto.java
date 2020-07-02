package io.javaclasses.filehub.storage.item.folder;

import com.google.errorprone.annotations.Immutable;
import com.google.gson.annotations.SerializedName;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Value object that contains information about folder {@link FolderMetadataRecord}.
 * <p>Used for serialization into JSON.</p>
 */
@Immutable
public final class FolderDto {
    /**
     * Identifier of folder.
     */
    @SerializedName("id")
    private final String id;
    /**
     * Name of folder.
     */
    @SerializedName("name")
    private final String name;
    /**
     * Identifier of parent folder.
     */
    @SerializedName("parentId")
    private final String parentId;
    /**
     * Number of file items in folder.
     */
    @SerializedName("filesCount")
    private final long fileItemCount;
    /**
     * Defines item type.
     */
    @SerializedName("type")
    private final String type = "folder";

    /**
     * Creates new {@link FolderDto} instance retrieving data from {@code folderMetadataRecord}.
     *
     * @param folderMetadataRecord folder record on the basis of which a folder DTO is created.
     */
    public FolderDto(FolderMetadataRecord folderMetadataRecord) {
        checkNotNull(folderMetadataRecord);

        this.id = folderMetadataRecord.id().value();
        this.name = folderMetadataRecord.folderName().value();

        FolderId parentId = folderMetadataRecord.parentFolderId();
        this.parentId = parentId != null ? parentId.value() : null;
        this.fileItemCount = folderMetadataRecord.fileItemCount().value();
    }

    /**
     * Getter for folder identifier.
     *
     * @return folder identifier.
     */
    public String id() {
        return id;
    }

    /**
     * Getter for folder name.
     *
     * @return folder name.
     */
    public String name() {
        return name;
    }

    /**
     * Getter for identifier of the parent folder.
     *
     * @return folder identifier.
     */
    public String parentId() {
        return parentId;
    }

    /**
     * Getter for number or items in folder.
     *
     * @return number or items.
     */
    public long fileItemCount() {
        return fileItemCount;
    }
}
