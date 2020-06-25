package io.javaclasses.filehub.api.user;

import com.google.common.base.Preconditions;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;
import io.javaclasses.filehub.storage.user.UserStorage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.UUID;

/**
 * Implements user registration functionality.
 */
public class Registration implements AbstractProcess {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(Registration.class);
    /**
     * Executes operations with user.
     */
    private final UserStorage storage;

    /**
     * Creates new {@link Registration} process instance.
     *
     * @param storage {@link UserStorage} instance.
     */
    public Registration(UserStorage storage) {
        Preconditions.checkNotNull(storage);
        this.storage = storage;
    }

    /**
     * Registers new user in application.
     *
     * @param registerUser value object that contains user credentials for registration.
     * @throws LoginIsTakenException if user with this login already exists.
     */
    @Override
    public void register(RegisterUser registerUser) throws BusyLoginException {
        Preconditions.checkNotNull(registerUser);
        String hashedPassword = PasswordHashCreator.hashedPassword(registerUser.password().value());

        if (storage.findByLogin(registerUser.login().value()).isPresent()) {
            logger.warn("Unsuccessful registration. Login " + registerUser.login().value() + " is already taken.");
            throw new LoginIsTakenException("User with this login already exists.");
        }
        User userForRegistration = new User(
                new UserId(UUID.randomUUID().toString()), registerUser.login().value(), hashedPassword);

        storage.add(userForRegistration);
        logger.debug("User with login %20s is successfully registered.", userForRegistration.login());
    }
}
