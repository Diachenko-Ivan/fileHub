package io.javaclasses.filehub.storage.item.folder;

import io.javaclasses.filehub.storage.Record;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.user.UserId;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Data structure that contains information about folder. Stored in {@link FolderMetadataStorage}.
 * <p>If {@code parentFolderId} is <i>null</i> then folder is root.
 */
public final class FolderMetadataRecord extends Record<FolderId> {
    private ItemName folderName;
    private final UserId ownerId;
    private FileItemCount fileItemCount;
    /**
     * Identifier of parent folder.
     */
    private final FolderId parentFolderId;

    public FolderMetadataRecord(FolderId id, ItemName folderName,
                                UserId ownerId, FileItemCount fileItemCount, FolderId parentFolderId) {
        super(id);
        this.folderName = checkNotNull(folderName);
        this.ownerId = checkNotNull(ownerId);
        this.fileItemCount = checkNotNull(fileItemCount);
        this.parentFolderId = parentFolderId;
    }

    public ItemName folderName() {
        return folderName;
    }

    public void setFolderName(ItemName folderName) {
        this.folderName = folderName;
    }

    public UserId ownerId() {
        return ownerId;
    }

    public FileItemCount fileItemCount() {
        return fileItemCount;
    }

    public void setFileItemCount(FileItemCount fileItemCount) {
        this.fileItemCount = fileItemCount;
    }

    public FolderId parentFolderId() {
        return parentFolderId;
    }

    /**
     * Compares folders by their ids.
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FolderMetadataRecord user = (FolderMetadataRecord) o;
        return this.id().equals(user.id());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return Objects.hash(this.id());
    }
}
