package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.Process;
import io.javaclasses.filehub.storage.user.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.IdGenerator.generateId;
import static io.javaclasses.filehub.api.user.PasswordHasher.hash;

/**
 * The application process that handles {@link AuthenticateUser} command.
 */
public class Authentication implements Process {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(Authentication.class);
    /**
     * Time in milliseconds after which token will expire.
     */
    private static final int EXPIRATION_INTERVAL = 900000;
    /**
     * Storage for users {@link User}.
     */
    private final UserStorage userStorage;
    /**
     * Storage for access tokens {@link TokenRecord}.
     */
    private final TokenStorage tokenStorage;

    /**
     * Creates new {@link Authentication} process instance.
     *
     * @param userStorage {@link UserStorage} instance.
     */
    public Authentication(UserStorage userStorage, TokenStorage tokenStorage) {
        this.userStorage = checkNotNull(userStorage);
        this.tokenStorage = checkNotNull(tokenStorage);
    }

    /**
     * Authenticates user handling {@link AuthenticateUser} command.
     *
     * @param authenticateUser login and password.
     * @throws AuthenticationException if user with these credentials {@code authenticateUser.login()}
     *                                 and {@code authenticateUser.password()} is not found.
     */
    public TokenRecord logIn(AuthenticateUser authenticateUser) throws AuthenticationException {
        checkNotNull(authenticateUser);
        String hashedPassword = hash(authenticateUser.password().value());

        Optional<User> existentUser = userStorage.find(authenticateUser.login(), hashedPassword);

        if (!existentUser.isPresent()) {
            if (logger.isWarnEnabled()) {
                logger.warn("User with login " + authenticateUser.login().value()
                        + " and password " + authenticateUser.password().value() + " was not authenticated.");
            }
            throw new AuthenticationException();
        }

        TokenRecord tokenRecord = new TokenRecord(new TokenId(generateId()),
                existentUser.get().id(),
                new Date(new Date().getTime() + EXPIRATION_INTERVAL));

        tokenStorage.add(tokenRecord);
        return tokenRecord;
    }
}
