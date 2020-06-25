package io.javaclasses.filehub.web;

import io.javaclasses.filehub.api.AbstractProcess;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserStorage;
import io.javaclasses.filehub.web.routes.RegistrationRoute;
import spark.Route;

import java.util.HashMap;
import java.util.Map;

import static spark.Spark.*;

/**
 * Represents File Hub application, configs server which based on {@link spark.Spark}
 * and registers routes {@link spark.Route} for incoming client requests.
 */
public class WebApplication {
    /**
     * Storage for users {@link User}.
     * <p>Used by {@link AbstractProcess}.
     */
    private final UserStorage userStorage = new UserStorage();
    /**
     * Map that contains key as a request path {@link RequestPath} and value as appropriate {@link Route}.
     */
    private final Map<RequestPath, Route> routeMapping = new HashMap<>();

    /**
     * Starts application.
     *
     * @param args program arguments.
     */
    public static void main(String[] args) {
        WebApplication application = new WebApplication();
        application.registerRoutes();
        application.run();
    }

    /**
     * Starts and configures server.
     */
    private void run() {
        port(8080);
        staticFiles.location("/app/");

        post(RequestPath.REGISTRATION.toString(), routeMapping.get(RequestPath.REGISTRATION));
    }

    /**
     * Registers routes with appropriate request paths.
     */
    private void registerRoutes() {
        routeMapping.put(RequestPath.REGISTRATION, new RegistrationRoute(userStorage));
    }
}
