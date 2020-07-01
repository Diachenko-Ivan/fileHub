package io.javaclasses.filehub.web.routes;

import io.javaclasses.filehub.api.user.LogOutUser;
import io.javaclasses.filehub.api.user.LogoutProcess;
import io.javaclasses.filehub.storage.user.TokenId;
import io.javaclasses.filehub.storage.user.TokenRecord;
import io.javaclasses.filehub.storage.user.TokenStorage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Splitter.on;
import static com.google.common.collect.Iterables.get;

/**
 * Implementation of {@link Route} that handles request for user logout.
 */
public class LogoutRoute implements Route {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(LogoutRoute.class);

    /**
     * Storage for {@link TokenRecord}.
     */
    private final TokenStorage tokenStorage;

    /**
     * Creates new {@link RegistrationRoute} instance.
     *
     * @param tokenStorage storage for {@link TokenRecord}.
     */
    public LogoutRoute(TokenStorage tokenStorage) {
        this.tokenStorage = checkNotNull(tokenStorage);
    }

    /**
     * Handles request for user logout.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) {
        if (logger.isInfoEnabled()) {
            logger.info("Request to '/api/logout'.");
        }
        String authorizationToken = get(on(' ').split(request.headers("Authorization")), 1);
        TokenId tokenId = new TokenId(authorizationToken);

        new LogoutProcess(tokenStorage).logOut(new LogOutUser(tokenId));

        if (logger.isInfoEnabled()) {
            logger.info("User with access token: " + authorizationToken + " was logged out.");
        }
        return "User is logged out";
    }
}
