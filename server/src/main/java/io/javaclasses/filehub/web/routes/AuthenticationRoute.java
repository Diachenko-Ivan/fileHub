package io.javaclasses.filehub.web.routes;

import com.google.gson.JsonParseException;
import io.javaclasses.filehub.api.user.AuthenticateUser;
import io.javaclasses.filehub.api.user.Authentication;
import io.javaclasses.filehub.api.user.UserIsNotAuthenticatedException;
import io.javaclasses.filehub.storage.user.*;
import io.javaclasses.filehub.web.deserializer.AuthenticateUserDeserializer;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static javax.servlet.http.HttpServletResponse.SC_OK;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.eclipse.jetty.http.HttpStatus.UNPROCESSABLE_ENTITY_422;

/**
 * Implementation of {@link Route} that handles requests for user authentication.
 */
public class AuthenticationRoute implements Route {
    /**
     * Storage for users {@link User}.
     */
    private final UserStorage userStorage;
    /**
     * Storage for access tokens {@link LoggedInUserRecord}
     */
    private final LoggedInUserStorage loggedInUserStorage;

    /**
     * Creates new {@link AuthenticationRoute} instance.
     *
     * @param userStorage         storage for users.
     * @param loggedInUserStorage storage for tokens.
     */
    public AuthenticationRoute(UserStorage userStorage, LoggedInUserStorage loggedInUserStorage) {
        this.userStorage = checkNotNull(userStorage);
        this.loggedInUserStorage = checkNotNull(loggedInUserStorage);
    }

    /**
     * Handles request for user authentication.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) {
        response.type("application/json");
        try {
            AuthenticateUser authenticateUser = new AuthenticateUserDeserializer().deserialize(request.body());
            LoggedInUserRecord loggedInUserRecord = new Authentication(userStorage, loggedInUserStorage).handle(authenticateUser);
            response.status(SC_OK);
            return loggedInUserRecord.id();
        } catch (UserIsNotAuthenticatedException | CredentialsAreNotValidException e) {

            response.status(SC_UNAUTHORIZED);
            return "No user with these credentials.";
        } catch (JsonParseException e) {

            response.status(UNPROCESSABLE_ENTITY_422);
            return "Unable to process request body";
        }
    }
}
