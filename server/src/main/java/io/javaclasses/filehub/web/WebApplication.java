package io.javaclasses.filehub.web;

import io.javaclasses.filehub.api.user.AuthorizationService;
import io.javaclasses.filehub.storage.user.TokenStorage;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserStorage;
import io.javaclasses.filehub.web.routes.AuthenticationRoute;
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
     * Storage for access tokens.
     */
    private final TokenStorage tokenStorage = new TokenStorage();
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
        this.filter();

        path("/api", () -> {
            post("/register", new RegistrationRoute(userStorage));
            post("/login", new AuthenticationRoute(userStorage, tokenStorage));
        });
    }

    /**
     * Filters requests.
     */
    private void filter() {
        Filter authorizationFilter = new AuthorizationFilter();
        path("/api", () -> {
            before("/folder/*", authorizationFilter);
            before("/file/*", authorizationFilter);
            before("/user", authorizationFilter);
            before("/logout", authorizationFilter);
        });
    }
}
