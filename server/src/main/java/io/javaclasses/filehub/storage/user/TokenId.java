package io.javaclasses.filehub.storage.user;

import io.javaclasses.filehub.storage.Id;

/**
 * Used as id for {@link TokenRecord}.
 */
public class TokenId extends Id {

    /**
     * Creates new {@link TokenId} instance.
     *
     * @param value id value.
     */
    public TokenId(String value) {
        super(value);
    }
}
