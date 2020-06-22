package io.javaclasses.filehub.api.user;

import com.google.common.base.Preconditions;
import io.javaclasses.filehub.storage.user.TokenRecord;
import io.javaclasses.filehub.storage.user.TokenStorage;
import io.javaclasses.filehub.storage.user.UserStorage;

/**
 * Used for user authorization and getting information about already authorized user.
 */
public class AuthorizationService {
    /**
     * Storage for token reading and creating.
     */
    private final TokenStorage tokenStorage;
    /**
     * Used for reading of users.
     */
    private final UserStorage userStorage;

    /**
     * Creates new {@link AuthorizationService} instance.
     *
     * @param tokenStorage storage for token info.
     * @param userStorage  storage for user info.
     */
    public AuthorizationService(TokenStorage tokenStorage, UserStorage userStorage) {
        Preconditions.checkNotNull(tokenStorage);
        Preconditions.checkNotNull(userStorage);
        this.tokenStorage = tokenStorage;
        this.userStorage = userStorage;
    }

    /**
     * Creates new session for user saving {@link TokenRecord} instance.
     *
     * @param record token for saving in storage.
     */
    public void createSession(TokenRecord record) {
        Preconditions.checkNotNull(record);
        this.tokenStorage.add(record);
    }
}
