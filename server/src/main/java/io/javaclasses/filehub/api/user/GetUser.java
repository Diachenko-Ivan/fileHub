package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.Query;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * An intention of the client to retrieve information about the {@link User}.
 */
public class GetUser implements Query {
    /**
     * An identifier of the requested user.
     */
    private final UserId userId;

    /**
     * Creates new GetUser command instance.
     *
     * @param userId an identifier of the requested user.
     */
    public GetUser(UserId userId) {
        this.userId = checkNotNull(userId);
    }

    /**
     * Returns user`s identifier.
     *
     * @return user`s identifier.
     */
    public UserId userId() {
        return userId;
    }
}
