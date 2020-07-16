package io.javaclasses.filehub.storage.user;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.RecordId;

/**
 * Identifier for {@link LoggedInUserRecord}.
 */
@Immutable
public final class Token extends RecordId {
    /**
     * Creates new {@link Token} instance.
     *
     * @param value id value.
     */
    public Token(String value) {
        super(value);
    }
}
