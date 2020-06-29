package io.javaclasses.filehub.web;

import io.javaclasses.filehub.api.user.AuthorizationService;
import io.javaclasses.filehub.storage.user.TokenStorage;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserStorage;
import io.javaclasses.filehub.web.routes.RegistrationRoute;
import spark.Filter;

import static spark.Spark.*;

/**
 * Represents File Hub application, configs server which based on {@link spark.Spark}
 * and registers routes {@link spark.Route} for client requests.
 */
public class WebApplication {
    /**
     * Storage for users {@link User}.
     */
    private final UserStorage userStorage = new UserStorage();
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
     * Starts and configures server.
     */
    private void run() {
        port(8080);
        staticFiles.location("/app/");

        path("/api", () -> {
            post("/register", new RegistrationRoute(userStorage));
        });

        post("/api/login", (request, response) -> {
            response.type("application/json");
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
