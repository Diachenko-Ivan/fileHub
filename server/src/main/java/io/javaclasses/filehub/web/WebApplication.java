package io.javaclasses.filehub.web;

import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserStorage;
import io.javaclasses.filehub.web.routes.RegistrationRoute;

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
    }
}
