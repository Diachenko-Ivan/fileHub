package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.storage.user.*;

import java.util.Date;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

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
        this.tokenStorage = checkNotNull(tokenStorage);
        this.userStorage = checkNotNull(userStorage);
    }


    /**
     * Returns authorized user by {@code token}.
     * <p>If user is not found by token or token is already expired method returns null.
     *
     * @param tokenValue user access token value.
     * @return authorized user or null.
     */
    public User authorizedUser(String tokenValue) {
        checkNotNull(tokenValue);
        Optional<TokenRecord> token = tokenStorage.find(new TokenId(tokenValue));

        if (!token.isPresent()) {
            return null;
        }
        TokenRecord tokenRecord = token.get();
        if (new Date().after(tokenRecord.expirationDate())) {
            tokenStorage.remove(tokenRecord.id());
            return null;
        }
        Optional<User> userById = userStorage.find(tokenRecord.userId());

        return userById.orElse(null);
    }

    /**
     * Creates new session for user saving {@link TokenRecord} instance.
     *
     * @param record token for saving in storage.
     */
    public void createSession(TokenRecord record) {
        checkNotNull(record);
        this.tokenStorage.add(record);
    }
}
