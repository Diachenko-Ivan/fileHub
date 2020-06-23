package io.javaclasses.filehub.web;

import io.javaclasses.filehub.api.user.*;
import io.javaclasses.filehub.storage.user.TokenRecord;
import io.javaclasses.filehub.storage.user.TokenStorage;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserStorage;
import io.javaclasses.filehub.web.deserializer.AuthenticateUserDeserializer;
import io.javaclasses.filehub.web.deserializer.RegisterUserDeserializer;
import io.javaclasses.filehub.web.serializer.BusyLoginExceptionSerializer;
import io.javaclasses.filehub.web.serializer.CredentialValidationExceptionSerializer;
import io.javaclasses.filehub.web.serializer.TokenSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Filter;

import java.util.Arrays;
import java.util.HashMap;

import static spark.Spark.*;

/**
 * Represents application server that can catch client requests.
 */
public class WebApplication {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(WebApplication.class);
    /**
     * Storage for operations with user {@link User}.
     */
    private final UserStorage userStorage = new UserStorage(new HashMap<>());
    /**
     * Storage for operations with token. Used by {@link AuthorizationService}.
     */
    private final TokenStorage tokenStorage = new TokenStorage(new HashMap<>());
    /**
     * Service that works with authorization session.
     */
    private final AuthorizationService authorizationService = new AuthorizationService(tokenStorage, userStorage);

    /**
     * Starts application.
     *
     * @param args program arguments.
     */
    public static void main(String[] args) {
        WebApplication application = new WebApplication();
        application.run();
    }

    /**
     * Starts server.
     */
    private void run() {
        port(8080);
        staticFiles.location("/app/");
        this.filter();

        post("/api/register", (request, response) -> {
            logger.info("Request to '/api/register' url.");
            response.type("application/json");
            try {
                RegisterUser registerUserCommand = new RegisterUserDeserializer().deserialize(request.body());
                new Registration(userStorage).register(registerUserCommand);
                response.status(200);
                logger.info("User with login " + registerUserCommand.login()
                        + " and password " + registerUserCommand.password() + " was registered.");
                return "User is registered";
            } catch (CredentialValidationException e) {
                logger.warn("User credentials are not validated:" + Arrays.toString(e.failedCredentials()));
                response.status(422);
                return new CredentialValidationExceptionSerializer().serialize(e);
            } catch (BusyLoginException e) {
                logger.warn("Unsuccessful registration. Login is already busy.");
                response.status(422);
                return new BusyLoginExceptionSerializer().serialize(e);
            }
        });

        post("/api/login", (request, response) -> {
            logger.info("Request to '/api/login' url.");
            try {
                AuthenticateUser authenticateUser = new AuthenticateUserDeserializer().deserialize(request.body());
                TokenRecord tokenRecord = new Authentication(userStorage).logIn(authenticateUser);
                authorizationService.createSession(tokenRecord);
                logger.info("User with login " + authenticateUser.login() + " was authenticated.");
                return new TokenSerializer().serialize(tokenRecord);
            } catch (AuthenticationException e) {
                logger.warn("User was not authenticated.");
                response.status(401);
                return "No user with these credentials.";
            }
        });
    }

    /**
     * Filters incoming requests.
     */
    private void filter() {
        path("/api", () -> {
            Filter authorizationFilter = (request, response) -> {
                String authorizationToken = request.headers("Authorization").split(" ")[1];
                logger.debug("Authorization process. Token: " + authorizationToken);
                User user = authorizationService.authorizedUser(authorizationToken);
                if (user == null) {
                    logger.warn("User with token " + authorizationToken
                            + " failed authorization to " + request.pathInfo() + " request.");
                    halt(401);
                }
                logger.debug("User " + user.login() + " passed authorization to " + request.pathInfo() + " request.");
            };
            before("/folder/*", authorizationFilter);
            before("/file/*", authorizationFilter);
            before("/user", authorizationFilter);
            before("/logout", authorizationFilter);
        });
    }
}
