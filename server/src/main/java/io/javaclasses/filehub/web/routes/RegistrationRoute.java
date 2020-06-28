package io.javaclasses.filehub.web.routes;

import com.google.gson.JsonParseException;
import io.javaclasses.filehub.api.user.CredentialsAreNotValidException;
import io.javaclasses.filehub.api.user.LoginIsTakenException;
import io.javaclasses.filehub.api.user.RegisterUser;
import io.javaclasses.filehub.api.user.Registration;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserStorage;
import io.javaclasses.filehub.web.deserializer.RegisterUserDeserializer;
import io.javaclasses.filehub.web.serializer.CredentialsAreNotValidExceptionSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.Arrays;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Route that handles request for registration of user.
 */
public class RegistrationRoute implements Route {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(RegistrationRoute.class);
    /**
     * Storage for users {@link User}.
     */
    private final UserStorage userStorage;

    /**
     * Creates new {@link RegistrationRoute}.
     *
     * @param userStorage storage for users {@link User}
     */
    public RegistrationRoute(UserStorage userStorage) {
        this.userStorage = checkNotNull(userStorage);
        if (logger.isInfoEnabled()) {
            logger.info("RegistrationRoute is registered.");
        }
    }

    /**
     * Invoked at the registration request.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) {
        if (logger.isInfoEnabled()) {
            logger.info("Request to '/api/register' url.");
        }
        response.type("application/json");
        try {
            RegisterUser registerUserCommand = new RegisterUserDeserializer().deserialize(request.body());
            new Registration(userStorage).register(registerUserCommand);
            response.status(200);
            return "User is registered";
        } catch (CredentialsAreNotValidException e) {
            if (logger.isWarnEnabled()) {
                logger.warn("User credentials are not validated:" + Arrays.toString(e.failedCredentials()));
            }
            response.status(422);
            return new CredentialsAreNotValidExceptionSerializer().serialize(e);
        } catch (LoginIsTakenException e) {
            response.status(400);
            return "User with this login already exists.";
        } catch (JsonParseException e) {
            if (logger.isWarnEnabled()) {
                logger.warn("Failed to parse request body: " +
                        request.body() + " for incoming request for registration.");
            }
            response.status(422);
            return "Failed JSON deserialization. Incorrect parameters.";
        }
    }
}
