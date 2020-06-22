package io.javaclasses.filehub.api.user;

import com.google.common.base.Preconditions;
import io.javaclasses.filehub.storage.user.TokenRecord;
import io.javaclasses.filehub.storage.user.TokenStorage;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserStorage;

import java.util.Date;
import java.util.Optional;

import static com.google.common.base.Preconditions.*;

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
        checkNotNull(tokenStorage);
        checkNotNull(userStorage);
        this.tokenStorage = tokenStorage;
        this.userStorage = userStorage;
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
        TokenRecord token = tokenStorage.findByToken(tokenValue);

        if (token == null) {
            return null;
        }
        if (new Date().after(token.expirationDate())) {
            tokenStorage.remove(token.token());
            return null;
        }
        Optional<User> userById = userStorage.findById(token.userId());

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
