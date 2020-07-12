package io.javaclasses.filehub.api.item.folder;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.Query;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.user.UserId;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The intention of the client to receive the content of one folder {@link FolderMetadataRecord}.
 */
@Immutable
public final class GetFolderContent implements Query {
    /**
     * An identifier of the folder from which the content is taken.
     */
    private final FolderId folderId;
    /**
     * An identifier of the folder owner.
     */
    private final UserId ownerId;

    /**
     * Creates new GetFolder instance.
     *
     * @param folderId an identifier of the folder from which the content is taken.
     * @param ownerId  an identifier of the folder owner.
     */
    public GetFolderContent(FolderId folderId, UserId ownerId) {
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
