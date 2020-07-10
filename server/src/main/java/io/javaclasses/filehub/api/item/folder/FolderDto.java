package io.javaclasses.filehub.api.item.folder;

import com.google.errorprone.annotations.Immutable;
import com.google.gson.annotations.SerializedName;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A value object that contains information about folder {@link FolderMetadataRecord}.
 * <p>Used for serialization into JSON.</p>
 */
@Immutable
public final class FolderDto {
    /**
     * An identifier of the folder.
     */
    @SerializedName("id")
    private final String id;
    /**
     * A name of the folder.
     */
    @SerializedName("name")
    private final String name;
    /**
     * An identifier of the parent folder.
     */
    @SerializedName("parentId")
    private final String parentId;

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
    }

    /**
     * Getter for the folder identifier.
     *
     * @return folder identifier.
     */
    public String id() {
        return id;
    }

    /**
     * Getter for the folder name.
     *
     * @return folder name.
     */
    public String name() {
        return name;
    }

    /**
     * Getter for the identifier of the parent folder.
     *
     * @return folder identifier.
     */
    public String parentId() {
        return parentId;
    }

}
