package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.Process;
import io.javaclasses.filehub.api.TimeZoneIdentifier;
import io.javaclasses.filehub.storage.user.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.IdGenerator.generateId;
import static io.javaclasses.filehub.api.user.PasswordHasher.hash;
import static java.time.Duration.ofMinutes;
import static java.time.LocalDateTime.now;

/**
 * The application process that handles {@link AuthenticateUser} command.
 */
public class Authentication implements Process {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(Authentication.class);
    /**
     * Time in minutes after which token will expire.
     */
    private static final Duration TOKEN_EXPIRATION_INTERVAL = ofMinutes(15);
    /**
     * Storage for users {@link User}.
     */
    private final UserStorage userStorage;
    /**
     * Storage for access tokens {@link LoggedInUserRecord}.
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
     * @throws UserIsNotAuthenticatedException if user with these credentials {@code authenticateUser.login()}
     *                                         and {@code authenticateUser.password()} is not found.
     */
    public LoggedInUserRecord logIn(AuthenticateUser authenticateUser) throws UserIsNotAuthenticatedException {
        checkNotNull(authenticateUser);
        String hashedPassword = hash(authenticateUser.password().value());

        Optional<User> existentUser = userStorage.find(authenticateUser.login(), hashedPassword);

        if (!existentUser.isPresent()) {
            if (logger.isInfoEnabled()) {
                logger.info("User with login {} and password {} was not authenticated.", authenticateUser.login().value(),
                        authenticateUser.password().value());
            }
            throw new UserIsNotAuthenticatedException();
        }
        LoggedInUserRecord loggedInUserRecord = new LoggedInUserRecord(new TokenId(generateId()),
                existentUser.get().id(),
                now(TimeZoneIdentifier.get()).plusMinutes(tokenExpirationInterval()));

        tokenStorage.add(loggedInUserRecord);

        if (logger.isInfoEnabled()) {
            logger.info("Token with identifier {} was created.", loggedInUserRecord.id());
        }
        return loggedInUserRecord;
    }

    /**
     * Returns expiration interval.
     *
     * @return expiration interval.
     */
    private static synchronized long tokenExpirationInterval() {
        return TOKEN_EXPIRATION_INTERVAL.toMinutes();
    }
}
