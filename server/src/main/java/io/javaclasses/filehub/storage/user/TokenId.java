package io.javaclasses.filehub.storage.user;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.RecordId;

/**
 * Identifier for {@link LoggedInUserRecord}.
 */
@Immutable
public final class TokenId extends RecordId {
    /**
     * Creates new {@link TokenId} instance.
     *
     * @param value id value.
     */
    public TokenId(String value) {
        super(value);
    }
}
