package io.javaclasses.filehub.web;

import io.javaclasses.filehub.storage.item.file.FileContentRecord;
import io.javaclasses.filehub.storage.item.file.FileContentStorage;
import io.javaclasses.filehub.storage.item.file.FileMetadataRecord;
import io.javaclasses.filehub.storage.item.file.FileMetadataStorage;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.LoggedInUserStorage;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserStorage;
import io.javaclasses.filehub.web.routes.AuthenticationRoute;
import io.javaclasses.filehub.web.routes.FileUploadRoute;
import io.javaclasses.filehub.web.routes.FolderCreationRoute;
import io.javaclasses.filehub.web.routes.GetFolderContentRoute;
import io.javaclasses.filehub.web.routes.GetFolderRoute;
import io.javaclasses.filehub.web.routes.GetRootFolderRoute;
import io.javaclasses.filehub.web.routes.LogoutRoute;
import io.javaclasses.filehub.web.routes.RegistrationRoute;
import spark.Filter;

import static spark.Spark.before;
import static spark.Spark.get;
import static spark.Spark.path;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

/**
 * Represents File Hub application, configs server which based on {@link spark.Spark}
 * and registers routes {@link spark.Route} for client requests.
 */
public class WebApplication {
    /**
     * Storage for users {@link User}.
     */
    private final UserStorage userStorage = new UserStorage();
    /**
     * Storage for access tokens.
     */
    private final LoggedInUserStorage loggedInUserStorage = new LoggedInUserStorage();
    /**
     * Storage for {@link FolderMetadataRecord}.
     */
    private final FolderMetadataStorage folderMetadataStorage = new FolderMetadataStorage();
    /**
     * Storage for {@link FileMetadataRecord}.
     */
    private final FileMetadataStorage fileMetadataStorage = new FileMetadataStorage();
    /**
     * Storage for {@link FileContentRecord}.
     */
    private final FileContentStorage fileContentStorage = new FileContentStorage();

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
     * Starts and configures server.
     */
    private void run() {
        port(8080);
        staticFiles.location("/app/");
        filter();

        path("/api", () -> {
            post("/register", new RegistrationRoute(userStorage, folderMetadataStorage));
            post("/login", new AuthenticationRoute(userStorage, loggedInUserStorage));
            post("/folder/:folderId/folder", new FolderCreationRoute(folderMetadataStorage));
            post("/logout", new LogoutRoute(loggedInUserStorage));
            post("/folder/:folderId/file", "multipart/form-data",
                    new FileUploadRoute(folderMetadataStorage, fileMetadataStorage, fileContentStorage));
            get("/folder/root", new GetRootFolderRoute(folderMetadataStorage));
            get("/folder/:folderId", new GetFolderRoute(folderMetadataStorage));
            get("/folder/:folderId/content", new GetFolderContentRoute(fileMetadataStorage, folderMetadataStorage));
        });
    }

    /**
     * Filters requests.
     */
    private void filter() {
        Filter authorizationFilter = new AuthorizationFilter(loggedInUserStorage);
        before("/api/*", new LogRequestInfoFilter());
        path("/api", () -> {
            before("/folder/*", authorizationFilter);
            before("/file/*", authorizationFilter);
            before("/user", authorizationFilter);
            before("/logout", authorizationFilter);
        });
    }
}
