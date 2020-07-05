package io.javaclasses.filehub.web;

import io.javaclasses.filehub.api.user.LoggedInUserId;
import io.javaclasses.filehub.storage.user.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Filter;
import spark.Request;
import spark.Response;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Splitter.on;
import static com.google.common.collect.Iterables.get;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static spark.Spark.halt;

/**
 * Implementation of {@link Filter} that filters requests by whether the user {@link User} is authorized or not.
 */
public class AuthorizationFilter implements Filter {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(AuthorizationFilter.class);
    /**
     * Storage for tokens {@link LoggedInUserRecord}
     */
    private final LoggedInUserStorage loggedInUserStorage;

    /**
     * Creates new {@link AuthorizationFilter} instance.
     *
     * @param loggedInUserStorage storage for tokens {@link LoggedInUserRecord}
     */
    public AuthorizationFilter(LoggedInUserStorage loggedInUserStorage) {
        this.loggedInUserStorage = checkNotNull(loggedInUserStorage);
    }

    /**
     * Filters requests by whether the user is authorized and then request goes further
     * or not and then request breaks down and returns 401 response error status.
     * {@inheritDoc}
     */
    @Override
    public void handle(Request request, Response response) {
        String authorizationHeaderValue = request.headers("Authorization");
        if (authorizationHeaderValue == null || authorizationHeaderValue.split(" ").length != 2) {
            halt(SC_UNAUTHORIZED);
        }
        String authorizationToken = get(on(' ').split(authorizationHeaderValue), 1);

        UserId userId = new LoggedInUserId(loggedInUserStorage).get(new Token(authorizationToken));
        if (userId == null) {
            if (logger.isWarnEnabled()) {
                logger.warn("User with token " + authorizationToken
                        + " failed authorization to " + request.pathInfo() + " request.");
            }
            halt(SC_UNAUTHORIZED);
        }
        if (logger.isDebugEnabled()) {
            logger.debug("User with token " + authorizationToken
                    + " passed authorization to " + request.pathInfo() + " request.");
        }
    }
}
