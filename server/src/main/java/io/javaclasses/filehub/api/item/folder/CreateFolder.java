package io.javaclasses.filehub.api.item.folder;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.Command;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Client intention to create a new folder in already existing one.
 */
@Immutable
public final class CreateFolder implements Command {
    /**
     * An identifier of folder where new folder is being created.
     */
    private final FolderId parentFolderId;

    /**
     * Creates new {@link CreateFolder} instance.
     *
     * @param parentFolderId identifier of parent folder.
     */
    public CreateFolder(FolderId parentFolderId) {
        this.parentFolderId = checkNotNull(parentFolderId);
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
