package io.javaclasses.filehub.storage.item.folder;

import io.javaclasses.filehub.storage.Record;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;

import javax.annotation.Nullable;
import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A data structure that contains information about folder. Stored in {@link FolderMetadataStorage}.
 * <p>If {@code parentFolderId} is <i>null</i> then the folder is root.
 * <p>The root folder is unique, high-level folder for every {@link User}.
 */
public final class FolderMetadataRecord extends Record<FolderId> {
    /**
     * Folder name.
     */
    private ItemName folderName;
    /**
     * An identifier of the folder owner.
     */
    private final UserId ownerId;
    /**
     * A number of items in the folder.
     */
    private FileItemCount fileItemCount;
    /**
     * An identifier of the parent folder.
     */
    @Nullable
    private final FolderId parentFolderId;

    /**
     * Creates new {@link FolderMetadataRecord} instance.
     *
     * @param id             an identifier of the folder.
     * @param folderName     a name of folder.
     * @param ownerId        an identifier of folder owner {@link User}.
     * @param fileItemCount  a number of items in the folder.
     * @param parentFolderId an identifier for a parent folder.
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
     * Getter for the folder name.
     *
     * @return folder name.
     */
    public ItemName folderName() {
        return folderName;
    }

    /**
     * Setter for the folder name.
     *
     * @param folderName new folder name.
     */
    public void setFolderName(ItemName folderName) {
        this.folderName = folderName;
    }

    /**
     * Getter for the folder owner identifier.
     *
     * @return the owner identifier.
     */
    public UserId ownerId() {
        return ownerId;
    }

    /**
     * Getter for the folder name.
     *
     * @return a number of file items in the folder.
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
     * Getter for the folder parent identifier.
     *
     * @return an identifier of the parent folder.
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
