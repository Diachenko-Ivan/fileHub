package io.javaclasses.filehub.web.routes;

import io.javaclasses.filehub.api.user.AuthenticateUser;
import io.javaclasses.filehub.api.user.Authentication;
import io.javaclasses.filehub.api.user.AuthenticationException;
import io.javaclasses.filehub.api.user.CredentialsAreNotValidException;
import io.javaclasses.filehub.storage.user.TokenRecord;
import io.javaclasses.filehub.storage.user.TokenStorage;
import io.javaclasses.filehub.storage.user.UserStorage;
import io.javaclasses.filehub.web.deserializer.AuthenticateUserDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;
import spark.Response;
import spark.Route;
import io.javaclasses.filehub.storage.user.User;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Implementation of {@link Route} that handles requests for user authentication.
 */
public class AuthenticationRoute implements Route {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationRoute.class);
    /**
     * Storage for users {@link User}.
     */
    private final UserStorage userStorage;
    /**
     * Storage for access tokens {@link TokenRecord}
     */
    private final TokenStorage tokenStorage;

    /**
     * Creates new {@link AuthenticationRoute} instance.
     *
     * @param userStorage  storage for users.
     * @param tokenStorage storage for tokens.
     */
    public AuthenticationRoute(UserStorage userStorage, TokenStorage tokenStorage) {
        this.userStorage = checkNotNull(userStorage);
        this.tokenStorage = checkNotNull(tokenStorage);
    }

    /**
     * Handles request for user authentication.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) {
        response.type("application/json");
        if (logger.isInfoEnabled()) {
            logger.info("Request to '/api/login' url.");
        }
        try {
            AuthenticateUser authenticateUser = new AuthenticateUserDeserializer().deserialize(request.body());
            TokenRecord tokenRecord = new Authentication(userStorage, tokenStorage).logIn(authenticateUser);
            if (logger.isInfoEnabled()) {
                logger.info("User with login " + authenticateUser.login() + " was authenticated.");
            }
            return tokenRecord.id();
        } catch (AuthenticationException | CredentialsAreNotValidException e) {
            response.status(401);
            return "No user with these credentials.";
        }
    }
}