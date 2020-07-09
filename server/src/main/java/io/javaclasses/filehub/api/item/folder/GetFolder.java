package io.javaclasses.filehub.api.item.folder;

import io.javaclasses.filehub.api.Query;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.user.UserId;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The intention of the client to receive one folder {@link FolderMetadataRecord}.
 */
public class GetFolder implements Query {
    /**
     * An identifier of requested folder.
     */
    private final FolderId folderId;
    /**
     * An identifier of the folder owner.
     */
    private final UserId ownerId;

    /**
     * Creates new GetFolder instance.
     *
     * @param folderId an identifier of requested folder.
     * @param ownerId  an identifier of the folder owner.
     */
    public GetFolder(FolderId folderId, UserId ownerId) {
        this.folderId = checkNotNull(folderId);
        this.ownerId = checkNotNull(ownerId);
    }

    /**
     * Getter for the identifier of the folder.
     *
     * @return the identifier of the folder.
     */
    public FolderId folderId() {
        return folderId;
    }

    /**
     * Getter for the identifier of the owner.
     *
     * @return the identifier of the owner.
     */
    public UserId ownerId() {
        return ownerId;
    }
}
