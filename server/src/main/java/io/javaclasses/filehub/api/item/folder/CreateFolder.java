package io.javaclasses.filehub.api.item.folder;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.Command;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;

import javax.annotation.Nullable;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Client intention to create new folder in already existent folder.
 * <p>If {@code parentFolderId} is null, the created folder is root.</p>
 */
@Immutable
public final class CreateFolder implements Command {
    /**
     * An identifier of user {@link User} who creates new folder.
     */
    private final UserId ownerId;
    /**
     * An identifier of folder where new folder is being created.
     */
    @Nullable
    private final FolderId parentFolderId;

    /**
     * Creates new {@link CreateFolder} instance.
     *
     * @param ownerId        creator identifier.
     * @param parentFolderId identifier of parent folder.
     */
    public CreateFolder(UserId ownerId, @Nullable FolderId parentFolderId) {
        this.ownerId = checkNotNull(ownerId);
        this.parentFolderId = parentFolderId;
    }

    /**
     * Getter for folder owner identifier.
     *
     * @return owner {@link User} identifier.
     */
    public UserId ownerId() {
        return ownerId;
    }

    /**
     * Getter for parent folder identifier.
     *
     * @return parent {@link FolderMetadataRecord} folder identifier.
     */
    public FolderId parentFolderId() {
        return parentFolderId;
    }
}
