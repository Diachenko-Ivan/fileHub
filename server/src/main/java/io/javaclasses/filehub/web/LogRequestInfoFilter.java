package io.javaclasses.filehub.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Filter;
import spark.Request;
import spark.Response;

import javax.servlet.MultipartConfigElement;

/**
 * The implementation of {@link Filter} that logs common info about request.
 */
public class LogRequestInfoFilter implements Filter {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(LogRequestInfoFilter.class);

    /**
     * Handles request and logs info from it.
     * {@inheritDoc}
     */
    @Override
    public void handle(Request request, Response response) {
        request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement(""));

        if (logger.isInfoEnabled()) {
            logger.info("Request to '{}' with authorization header '{}'",
                    request.pathInfo(), request.headers("Authorization"));
        }
    }
}
