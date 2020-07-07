package io.javaclasses.filehub.api.item.folder;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.Query;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The intention of the client to receive an identifier of his root folder.
 */
@Immutable
public final class GetRootFolderId implements Query {
    /**
     * An identifier of the owner {@link User} of the root folder.
     */
    private final UserId ownerId;

    /**
     * Creates a new GetRootFolderId query instance.
     *
     * @param ownerId an identifier of the owner of the root folder.
     */
    public GetRootFolderId(UserId ownerId) {
        this.ownerId = checkNotNull(ownerId);
    }

    /**
     * Getter for owner identifier.
     *
     * @return user identifier.
     */
    public UserId ownerId() {
        return ownerId;
    }
}
