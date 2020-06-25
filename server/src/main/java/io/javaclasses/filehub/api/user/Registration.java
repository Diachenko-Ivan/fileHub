package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.AbstractProcess;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;
import io.javaclasses.filehub.storage.user.UserStorage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.UUID;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Represents registration process that can handle {@link RegisterUser} command.
 */
public class Registration implements AbstractProcess {
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
        String hashedPassword = PasswordHashCreator.hashedPassword(registerUser.password().value());

        if (storage.findByLogin(registerUser.login().value()).isPresent()) {
            logger.warn("Unsuccessful registration. Login " + registerUser.login().value() + " is already taken.");
            throw new LoginIsTakenException("User with this login already exists.");
        }
        User userForRegistration = new User(
                new UserId(UUID.randomUUID().toString()), registerUser.login().value(), hashedPassword);

        storage.add(userForRegistration);
        logger.debug("User with login " + userForRegistration.login() + " is successfully registered.");
    }
}
