package io.javaclasses.filehub.web.routes;

import io.javaclasses.filehub.api.user.LogOutUser;
import io.javaclasses.filehub.api.user.LogoutProcess;
import io.javaclasses.filehub.storage.user.LoggedInUserRecord;
import io.javaclasses.filehub.storage.user.LoggedInUserStorage;
import io.javaclasses.filehub.storage.user.Token;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Splitter.on;
import static com.google.common.collect.Iterables.get;
import static javax.servlet.http.HttpServletResponse.SC_OK;

/**
 * Implementation of {@link Route} that handles requests for user logout.
 */
public class LogoutRoute implements Route {
    /**
     * Storage for {@link LoggedInUserRecord}s.
     */
    private final LoggedInUserStorage storage;

    /**
     * Creates new {@link RegistrationRoute} instance.
     *
     * @param storage storage for {@link LoggedInUserRecord}.
     */
    public LogoutRoute(LoggedInUserStorage storage) {
        this.storage = checkNotNull(storage);
    }

    /**
     * Handles request for user logout.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) {
        LogOutUser logOutCommand = readCommand(request);
        LogoutProcess logoutProcess = getProcess();

        logoutProcess.handle(logOutCommand);
        response.status(SC_OK);
        return "User is logged out.";
    }

    /**
     * Returns the LogOutUser command parsing {@code request} headers.
     *
     * @param request object with {@code authorizationToken} value.
     * @return command.
     */
    private LogOutUser readCommand(Request request) {
        String authorizationToken = get(on(' ').split(request.headers("Authorization")), 1);
        Token tokenId = new Token(authorizationToken);

        return new LogOutUser(tokenId);
    }

    /**
     * Returns a new LogoutProcess instance.
     *
     * @return process.
     */
    private LogoutProcess getProcess() {
        return new LogoutProcess(storage);
    }
}
