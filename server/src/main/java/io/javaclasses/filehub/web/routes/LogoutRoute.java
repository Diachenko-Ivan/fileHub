package io.javaclasses.filehub.web.routes;

import io.javaclasses.filehub.api.user.LogOutUser;
import io.javaclasses.filehub.api.user.LogoutProcess;
import io.javaclasses.filehub.storage.user.LoggedInUserRecord;
import io.javaclasses.filehub.storage.user.LoggedInUserStorage;
import io.javaclasses.filehub.storage.user.Token;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Splitter.on;
import static com.google.common.collect.Iterables.get;

/**
 * Implementation of {@link Route} that handles requests for user logout.
 */
public class LogoutRoute implements Route {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(LogoutRoute.class);

    /**
     * Storage for {@link LoggedInUserRecord}.
     */
    private final LoggedInUserStorage storage;

    /**
     * Creates new {@link RegistrationRoute} instance.
     *
     * @param storage storage for {@link LoggedInUserRecord}.
     */
    public LogoutRoute(LoggedInUserStorage storage) {
        this.storage = checkNotNull(storage);
    }

    /**
     * Handles request for user logout.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) {
        String authorizationToken = get(on(' ').split(request.headers("Authorization")), 1);
        Token tokenId = new Token(authorizationToken);

        new LogoutProcess(storage).logOut(new LogOutUser(tokenId));

        if (logger.isInfoEnabled()) {
            logger.info("User with access token: " + authorizationToken + " was logged out.");
        }
        return "User is logged out";
    }
}
