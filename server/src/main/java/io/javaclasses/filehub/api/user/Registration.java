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
public class Registration implements RegistrationProcess {

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
     * {@inheritDoc}
     */
    @Override
    public void register(RegisterUser registerUser) throws BusyLoginException {
        Preconditions.checkNotNull(registerUser);
        String hashedPassword = StringHashCreator.hashedString(registerUser.password());

        if (storage.findByLogin(registerUser.login()).isPresent()) {
            throw new BusyLoginException("User with this login already exists.");
        }
        User userForRegistration = new User(
                new UserId(UUID.randomUUID().toString()), registerUser.login(), hashedPassword);

        storage.add(userForRegistration);
        logger.debug("User with login %20s is successfully registered.", userForRegistration.login());
    }
}
