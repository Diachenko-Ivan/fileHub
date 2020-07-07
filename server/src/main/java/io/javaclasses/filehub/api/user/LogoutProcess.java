package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.Process;
import io.javaclasses.filehub.storage.user.LoggedInUserRecord;
import io.javaclasses.filehub.storage.user.LoggedInUserStorage;
import io.javaclasses.filehub.storage.user.Token;
import io.javaclasses.filehub.web.routes.LogoutRoute;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The process in the application that handles {@link LogOutUser} command.
 * <p>Provides user logout functionality.</p>
 */
public class LogoutProcess implements Process {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(LogoutRoute.class);
    /**
     * Storage for access tokens {@link LoggedInUserRecord}.
     */
    private final LoggedInUserStorage storage;

    /**
     * Creates new {@link LogoutProcess} instance.
     *
     * @param storage storage with tokens.
     */
    public LogoutProcess(LoggedInUserStorage storage) {
        this.storage = checkNotNull(storage);
    }

    /**
     * Handles a {@link LogOutUser} command and logs out user.
     * <p>Under logout it is supposed to remove the token {@link LoggedInUserStorage} from the {@link LoggedInUserStorage}.
     *
     * @param logOutCommand command to log out user.
     */
    public void handle(LogOutUser logOutCommand) {
        checkNotNull(logOutCommand);
        Token token = logOutCommand.tokenId();
        storage.remove(token);
        if (logger.isInfoEnabled()) {
            logger.info("User with access token: {} was logged out.", token.value());
        }
    }
}
