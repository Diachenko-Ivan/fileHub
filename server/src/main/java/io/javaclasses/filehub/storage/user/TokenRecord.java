package io.javaclasses.filehub.storage.user;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.Record;

import java.time.Instant;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Data structure that contains information about authorization session.
 */
@Immutable
public final class TokenRecord extends Record<TokenId> {
    /**
     * User identifier.
     */
    private final UserId userId;
    /**
     * Token expiration date.
     */
    private final Instant expirationDate;

    /**
     * Creates new {@link TokenRecord} instance.
     *
     * @param tokenId        token identifier.
     * @param userId         user identifier.
     * @param expirationDate token expiration date.
     */
    public TokenRecord(TokenId tokenId, UserId userId, Instant expirationDate) {
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
    public Instant expirationDate() {
        return expirationDate;
    }

}
