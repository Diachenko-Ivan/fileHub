package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.storage.user.*;

import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Service for getting of identifier of authorized user {@link User}.
 */
public class LoggedInUserId {
    /**
     * Storage for tokens {@link LoggedInUserRecord}.
     */
    private final LoggedInUserStorage loggedInUserStorage;

    /**
     * Creates new {@link LoggedInUserId} instance.
     *
     * @param loggedInUserStorage storage for tokens {@link LoggedInUserRecord}.
     */
    public LoggedInUserId(LoggedInUserStorage loggedInUserStorage) {
        this.loggedInUserStorage = checkNotNull(loggedInUserStorage);
    }

    /**
     * Returns authorized user identifier by {@code tokenValue}.
     * <p>If user is not found by token or token is already expired method returns <i>null</i>.
     *
     * @param tokenId user access token identifier.
     * @return identifier of authorized user or {@code null} if user is not authorized.
     */
    public UserId get(Token tokenId) {
        checkNotNull(tokenId);
        Optional<LoggedInUserRecord> loggedInUserRecord = loggedInUserStorage.find(tokenId);

        return loggedInUserRecord.map(LoggedInUserRecord::userId).orElse(null);
    }
}
