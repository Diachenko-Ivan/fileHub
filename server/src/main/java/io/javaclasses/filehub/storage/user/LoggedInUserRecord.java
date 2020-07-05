package io.javaclasses.filehub.storage.user;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.Record;

import java.time.LocalDateTime;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Data structure that contains information about authorization session.
 */
@Immutable
public final class LoggedInUserRecord extends Record<Token> {
    /**
     * User identifier.
     */
    private final UserId userId;
    /**
     * Token expiration date.
     */
    private final LocalDateTime expirationDate;

    /**
     * Creates new {@link LoggedInUserRecord} instance.
     *
     * @param token        token identifier.
     * @param userId         user identifier.
     * @param expirationDate token expiration date.
     */
    public LoggedInUserRecord(Token token, UserId userId, LocalDateTime expirationDate) {
        super(token);
        this.userId = checkNotNull(userId);
        this.expirationDate = checkNotNull(expirationDate);
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
    public LocalDateTime expirationDate() {
        return expirationDate;
    }
}
