package io.javaclasses.filehub.web;

import static spark.Spark.*;

/**
 * Represents application server that can catch client requests.
 */
public class WebApplication {
    /**
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
        init();
    }
}
