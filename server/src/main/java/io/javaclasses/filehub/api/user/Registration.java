package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.Process;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;
import io.javaclasses.filehub.storage.user.UserStorage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.IdGenerator.generateId;
import static io.javaclasses.filehub.api.user.PasswordHasher.hash;

/**
 * Represents registration process that can handle {@link RegisterUser} command.
 */
public class Registration implements Process {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(Registration.class);
    /**
     * Storage for users {@link User}.
     */
    private final UserStorage storage;

    /**
     * Creates new {@link Registration} process instance.
     *
     * @param storage {@link UserStorage} instance.
     */
    public Registration(UserStorage storage) {
        this.storage = checkNotNull(storage);
    }

    /**
     * Registers new user in application.
     *
     * @param registerUser value object that contains user credentials for registration.
     * @throws LoginIsTakenException if user with this login already exists.
     */
    public void register(RegisterUser registerUser) throws LoginIsTakenException {
        checkNotNull(registerUser);
        String hashedPassword = hash(registerUser.password().value());

        if (storage.find(registerUser.login()).isPresent()) {
            if (logger.isWarnEnabled()) {
                logger.warn("Unsuccessful registration. Login " + registerUser.login().value() + " is already taken.");
            }
            throw new LoginIsTakenException("User with this login already exists.");
        }
        User userForRegistration = new User(
                new UserId(generateId()), registerUser.login(), hashedPassword);

        storage.add(userForRegistration);
        if (logger.isInfoEnabled()) {
            logger.info("User with login " + userForRegistration.login().value() + " and id: " + userForRegistration.id()
                    + " is successfully registered.");
        }
    }
}
