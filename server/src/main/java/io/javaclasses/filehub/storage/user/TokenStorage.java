package io.javaclasses.filehub.storage.user;

import com.google.common.base.Preconditions;
import io.javaclasses.filehub.storage.Storage;

import java.util.HashMap;

import static com.google.common.base.Preconditions.*;

/**
 * Used for executing CRUD operation with token.
 */
public class TokenStorage implements Storage<TokenId, TokenRecord> {
    /**
     * Stores tokens {@link TokenRecord}.
     */
    private final HashMap<String, TokenRecord> tokens;

    /**
     * Creates new {@link TokenStorage} record.
     *
     * @param tokens initial map.
     */
    public TokenStorage(HashMap<String, TokenRecord> tokens) {
        checkNotNull(tokens);
        this.tokens = tokens;
    }

    /**
     * Adds new token.
     *
     * @param record token which will be saved.
     */
    public synchronized void add(TokenRecord record) {
        checkNotNull(record);
        tokens.put(record.token(), record);
    }

    /**
     * Removes token by its value.
     *
     * @param tokenValue value of the token which will be removed.
     * @return removed token.
     */
    public synchronized TokenRecord remove(String tokenValue) {
        checkNotNull(tokenValue);
        return this.tokens.remove(tokenValue);
    }

    /**
     * Finds token record {@link TokenRecord} by token value.
     * <p>If token record is not found it returns null.
     *
     * @param tokenValue value if the token which is being found.
     * @return token or null.
     */
    public synchronized TokenRecord findByToken(String tokenValue) {
        checkNotNull(tokenValue);
        return this.tokens.get(tokenValue);
    }
}
