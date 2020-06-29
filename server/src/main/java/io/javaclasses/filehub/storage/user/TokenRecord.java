package io.javaclasses.filehub.storage.user;

import io.javaclasses.filehub.storage.Record;

import java.util.Date;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Represents user access token.
 */
public final class TokenRecord extends Record<TokenId> {
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
     * @param tokenId        token identifier.
     * @param userId         user identifier.
     * @param expirationDate token expiration date.
     */
    public TokenRecord(TokenId tokenId, UserId userId, Date expirationDate) {
        super(tokenId);
        checkNotNull(userId);
        checkNotNull(expirationDate);
        this.userId = userId;
        this.expirationDate = expirationDate;
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
