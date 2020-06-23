package io.javaclasses.filehub.storage.user;

import com.google.gson.annotations.Expose;
import io.javaclasses.filehub.storage.Record;

import java.util.Date;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Represents user access token.
 */
public class TokenRecord extends Record<TokenId> {
    /**
     * Contains token value.
     */
    @Expose
    private final String token;
    /**
     * User id.
     */
    private final UserId userId;
    /**
     * Token expiration date.
     */
    private final Date expirationDate;

    /**
     * Creates new {@link TokenRecord} instance.
     *
     * @param tokenValue token value.
     */
    public TokenRecord(TokenId tokenId, String tokenValue, UserId userId, Date expirationDate) {
        super(tokenId);
        checkNotNull(tokenValue);
        checkNotNull(userId);
        checkNotNull(expirationDate);
        this.token = tokenValue;
        this.userId = userId;
        this.expirationDate = expirationDate;
    }

    /**
     * Returns user`s token value.
     *
     * @return token value.
     */
    public String token() {
        return token;
    }

    /**
     * Returns user id.
     *
     * @return token value.
     */
    public UserId userId() {
        return userId;
    }

    /**
     * Returns token expiration date.
     *
     * @return token value.
     */
    public Date expirationDate() {
        return expirationDate;
    }

}
