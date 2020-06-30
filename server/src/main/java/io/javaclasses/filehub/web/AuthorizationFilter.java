package io.javaclasses.filehub.web;

import io.javaclasses.filehub.storage.user.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Filter;
import spark.Request;
import spark.Response;

import static spark.Spark.halt;

public class AuthorizationFilter implements Filter {

    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(WebApplication.class);

    @Override
    public void handle(Request request, Response response) {
        String authorizationToken = request.headers("Authorization").split(" ")[1];
        logger.debug("Authorization process. Token: " + authorizationToken);
        User user;
        if (true) {
            logger.warn("User with token " + authorizationToken
                    + " failed authorization to " + request.pathInfo() + " request.");
            halt(401);
        }
        //logger.debug("User " + user.login() + " passed authorization to " + request.pathInfo() + " request.");

    }
}
