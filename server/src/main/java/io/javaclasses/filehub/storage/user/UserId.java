package io.javaclasses.filehub.storage.user;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.RecordId;

/**
 * Represents id for {@link User} record.
 */
@Immutable
public final class UserId extends RecordId {
    /**
     * Creates new {@link UserId} instance.
     * @param id user id value.
     */
    public UserId(String id) {
        super(id);
    }
}
