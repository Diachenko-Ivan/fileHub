package io.javaclasses.filehub.web.routes;

import com.google.gson.JsonParseException;
import io.javaclasses.filehub.api.user.LoginIsTakenException;
import io.javaclasses.filehub.api.user.RegisterUser;
import io.javaclasses.filehub.api.user.Registration;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.CredentialsAreNotValidException;
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
import static javax.servlet.http.HttpServletResponse.SC_BAD_REQUEST;
import static javax.servlet.http.HttpServletResponse.SC_OK;
/**
 * Implementation of {@link Route} that handles request for registration of user.
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
     * Storage for {@link FolderMetadataRecord}.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * Creates new {@link RegistrationRoute}.
     *
     * @param userStorage storage for users {@link User}
     */
    public RegistrationRoute(UserStorage userStorage, FolderMetadataStorage folderMetadataStorage) {
        this.userStorage = checkNotNull(userStorage);
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
    }

    /**
     * Handles request for user registration.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) {
        response.type("application/json");
        try {
            RegisterUser registerUserCommand = new RegisterUserDeserializer().deserialize(request.body());
            new Registration(userStorage).register(registerUserCommand);
            response.status(SC_OK);
            return "User is registered";
        } catch (CredentialsAreNotValidException e) {
            if (logger.isInfoEnabled()) {
                logger.info("User credentials are not validated:" + Arrays.toString(e.failedCredentials()));
            }
            response.status(422);
            return new CredentialsAreNotValidExceptionSerializer().serialize(e);
        } catch (LoginIsTakenException e) {
            response.status(SC_BAD_REQUEST);
            return "User with this login already exists.";
        } catch (JsonParseException e) {
            if (logger.isInfoEnabled()) {
                logger.info("Failed to parse request body: " +
                        request.body() + " for incoming request for registration.");
            }
            response.status(422);
            return "Failed JSON deserialization. Incorrect parameters.";
        }
    }
}
