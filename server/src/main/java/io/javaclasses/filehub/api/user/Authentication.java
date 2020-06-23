package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.storage.user.TokenId;
import io.javaclasses.filehub.storage.user.TokenRecord;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserStorage;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Implements user authentication functionality.
 */
public class Authentication implements AuthenticationProcess {
    /**
     * Time in milliseconds after which token will expire.
     */
    public static final int EXPIRATION_INTERVAL = 900000;
    /**
     * Executes operations with user.
     */
    private final UserStorage userStorage;

    /**
     * Creates new {@link Authentication} process instance.
     *
     * @param userStorage {@link UserStorage} instance.
     */
    public Authentication(UserStorage userStorage) {
        checkNotNull(userStorage);
        this.userStorage = userStorage;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TokenRecord logIn(AuthenticateUser authenticateUser) throws AuthenticationException {
        checkNotNull(authenticateUser);
        String hashedPassword = StringHashCreator.hashedString(authenticateUser.password());
        Optional<User> existentUser = userStorage.findByLoginAndPassword(authenticateUser.login(), hashedPassword);
        if (existentUser.isEmpty()) {
            throw new AuthenticationException();
        }
        return new TokenRecord(new TokenId(UUID.randomUUID().toString()),
                UUID.randomUUID().toString(),
                existentUser.get().id(),
                new Date(new Date().getTime() + EXPIRATION_INTERVAL));
    }
}
