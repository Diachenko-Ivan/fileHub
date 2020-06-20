package io.javaclasses.filehub.storage.user;

import io.javaclasses.filehub.storage.Id;

/**
 * Represents id for {@link User} record.
 */
public class UserId extends Id {
    /**
     * Creates new {@link UserId} instance.
     * {@inheritDoc}
     */
    public UserId(String id) {
        super(id);
    }
}
