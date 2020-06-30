package io.javaclasses.filehub.web;

import io.javaclasses.filehub.api.user.AuthorizationService;
import io.javaclasses.filehub.storage.user.TokenRecord;
import io.javaclasses.filehub.storage.user.TokenStorage;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Filter;
import spark.Request;
import spark.Response;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Splitter.on;
import static com.google.common.collect.Iterables.get;
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
     * Storage for tokens {@link TokenRecord}
     */
    private final TokenStorage tokenStorage;

    /**
     * Creates new {@link AuthorizationFilter} instance.
     *
     * @param tokenStorage storage for tokens {@link TokenRecord}
     */
    public AuthorizationFilter(TokenStorage tokenStorage) {
        this.tokenStorage = checkNotNull(tokenStorage);
    }

    /**
     * Filters requests by whether the user is authorized and then request goes further
     * or not and then request breaks down and returns 401 response error status.
     * {@inheritDoc}
     */
    @Override
    public void handle(Request request, Response response) {
        String authorizationToken = get(on(' ').split(request.headers("Authorization")), 1);

        UserId userId = new AuthorizationService(tokenStorage).authorizedUserId(authorizationToken);
        if (userId == null) {
            if (logger.isWarnEnabled()) {
                logger.warn("User with token " + authorizationToken
                        + " failed authorization to " + request.pathInfo() + " request.");
            }
            halt(401);
        }
        if (logger.isDebugEnabled()) {
            logger.debug("User with token " + authorizationToken
                    + " passed authorization to " + request.pathInfo() + " request.");
        }
    }
}
