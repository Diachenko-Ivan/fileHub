package io.javaclasses.filehub.storage.user;

import com.google.common.base.Preconditions;
import io.javaclasses.filehub.storage.Storage;

import java.util.HashMap;
import java.util.Optional;

/**
 * Used for executing CRUD operations with user {@link User}.
 */
public class UserStorage implements Storage<UserId, User> {
    /**
     * Stores users {@link User}.
     */
    private final HashMap<UserId, User> users;

    /**
     * Creates new {@link UserStorage} instance.
     *
     * @param users initial map.
     */
    public UserStorage(HashMap<UserId, User> users) {
        Preconditions.checkNotNull(users);
        this.users = users;
    }
}
