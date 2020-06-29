package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.storage.user.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.IdGenerator.generateId;
import static io.javaclasses.filehub.api.user.PasswordHasher.hash;

/**
 * Implements user authentication functionality.
 */
public class Authentication implements AuthenticationProcess {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(Authentication.class);
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
    public Authentication(UserStorage userStorage, TokenStorage tokenStorage) {
        checkNotNull(userStorage);
        this.userStorage = userStorage;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TokenRecord logIn(AuthenticateUser authenticateUser) throws AuthenticationException {
        checkNotNull(authenticateUser);
        String hashedPassword = hash(authenticateUser.password().value());
        Optional<User> existentUser = userStorage.find(authenticateUser.login(), hashedPassword);
        if (!existentUser.isPresent()) {
            if (logger.isWarnEnabled()) {
                logger.warn("User with login " + authenticateUser.login().value()
                        + " and password " + authenticateUser.password().value() + " was not authenticated");
            }
            throw new AuthenticationException();
        }
        return new TokenRecord(new TokenId(generateId()),
                existentUser.get().id(),
                new Date(new Date().getTime() + EXPIRATION_INTERVAL));
    }
}
