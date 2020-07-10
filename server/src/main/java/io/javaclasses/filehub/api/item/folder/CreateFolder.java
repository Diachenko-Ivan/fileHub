package io.javaclasses.filehub.api.item.folder;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.Command;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * An intention of the client to create a new folder in given parent folder.
 */
@Immutable
public final class CreateFolder implements Command {
    /**
     * An identifier of the folder where new folder is being created.
     */
    private final FolderId parentFolderId;
    /**
     * An identifier of the owner {@link User} of the parent folder.
     */
    private final UserId ownerId;

    /**
     * Creates new {@link CreateFolder} instance.
     *
     * @param parentFolderId an identifier of parent folder.
     * @param ownerId an identifier of the owner.
     */
    public CreateFolder(FolderId parentFolderId, UserId ownerId) {
        this.parentFolderId = checkNotNull(parentFolderId);
        this.ownerId = checkNotNull(ownerId);
    }

    /**
     * Getter for parent folder identifier.
     *
     * @return parent {@link FolderMetadataRecord} folder identifier.
     */
    public FolderId parentFolderId() {
        return parentFolderId;
    }

    /**
     * Getter for the parent folder owner identifier.
     *
     * @return an identifier of the owner.
     */
    public UserId ownerId() {
        return ownerId;
    }
}
