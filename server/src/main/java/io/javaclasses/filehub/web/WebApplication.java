package io.javaclasses.filehub.web;

import io.javaclasses.filehub.api.user.BusyLoginException;
import io.javaclasses.filehub.api.user.CredentialValidationException;
import io.javaclasses.filehub.api.user.RegisterUser;
import io.javaclasses.filehub.api.user.Registration;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserStorage;
import io.javaclasses.filehub.web.deserializer.RegisterUserDeserializer;
import io.javaclasses.filehub.web.serializer.BusyLoginExceptionSerializer;
import io.javaclasses.filehub.web.serializer.CredentialValidationExceptionSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

        post("/api/register", (request, response) -> {
            logger.info("Request to '/api/register' url.");
            response.type("application/json");
            try {
                RegisterUser registerUserCommand = new RegisterUserDeserializer().deserialize(request.body());
                new Registration(userStorage).register(registerUserCommand);
                response.status(200);
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
    }
}
