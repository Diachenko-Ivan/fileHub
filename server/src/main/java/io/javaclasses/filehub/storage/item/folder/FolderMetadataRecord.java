package io.javaclasses.filehub.storage.item.folder;

import io.javaclasses.filehub.storage.Record;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;

import javax.annotation.Nullable;
import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Data structure that contains information about folder. Stored in {@link FolderMetadataStorage}.
 * <p>If {@code parentFolderId} is <i>null</i> then folder is root.
 * <p>The root folder is a unique, high-level folder for every {@link User}.
 */
public final class FolderMetadataRecord extends Record<FolderId> {
    /**
     * Folder name.
     */
    private ItemName folderName;
    /**
     * Identifier of folder owner.
     */
    private final UserId ownerId;
    /**
     * Number of items in folder.
     */
    private FileItemCount fileItemCount;
    /**
     * Identifier of parent folder.
     */
    @Nullable
    private final FolderId parentFolderId;

    /**
     * Creates new {@link FolderMetadataRecord} instance.
     *
     * @param id             identifier of the folder.
     * @param folderName     name of folder.
     * @param ownerId        identifier of folder owner {@link User}.
     * @param fileItemCount  number of items in the folder.
     * @param parentFolderId identifier for a parent folder.
     */
    public FolderMetadataRecord(FolderId id, ItemName folderName,
                                UserId ownerId, FileItemCount fileItemCount, @Nullable FolderId parentFolderId) {
        super(id);
        this.folderName = checkNotNull(folderName);
        this.ownerId = checkNotNull(ownerId);
        this.fileItemCount = checkNotNull(fileItemCount);
        this.parentFolderId = parentFolderId;
    }

    /**
     * Getter for folder name.
     *
     * @return folder name.
     */
    public ItemName folderName() {
        return folderName;
    }

    /**
     * Setter for folder name.
     *
     * @param folderName new folder name.
     */
    public void setFolderName(ItemName folderName) {
        this.folderName = folderName;
    }

    /**
     * Getter for folder name.
     *
     * @return folder name.
     */
    public UserId ownerId() {
        return ownerId;
    }

    /**
     * Getter for folder name.
     *
     * @return folder name.
     */
    public FileItemCount fileItemCount() {
        return fileItemCount;
    }

    /**
     * Setter for number of items in the folder.
     *
     * @param fileItemCount new number of file items.
     */
    public void setFileItemCount(FileItemCount fileItemCount) {
        this.fileItemCount = fileItemCount;
    }

    /**
     * Getter for folder name.
     *
     * @return folder name.
     */
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
