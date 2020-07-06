package io.javaclasses.filehub.web.routes;

import com.google.gson.Gson;
import io.javaclasses.filehub.api.item.folder.CreateFolder;
import io.javaclasses.filehub.api.item.folder.FolderCreation;
import io.javaclasses.filehub.api.item.folder.ItemIsNotFoundException;
import io.javaclasses.filehub.storage.item.folder.FolderDto;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Splitter.on;
import static com.google.common.collect.Iterables.get;
import static javax.servlet.http.HttpServletResponse.SC_NOT_FOUND;

/**
 * Implementation of {@link Route} that handles requests for folder creation.
 */
public class FolderCreationRoute implements Route {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(FolderCreationRoute.class);
    /**
     * Storage for folders {@link FolderMetadataRecord}
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * Creates new FolderCreationRoute instance.
     *
     * @param folderMetadataStorage storage for folders {@link FolderMetadataRecord}.
     */
    public FolderCreationRoute(FolderMetadataStorage folderMetadataStorage) {
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
    }

    /**
     * Handles request for creation of a new folder.
     * <p>Sets {@code response.status()} 404 if folder where new folder is being created is not found.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) {
        if (logger.isInfoEnabled()) {
            logger.info("Request to '/api/folder/:folderId/folder' url.");
        }
        response.type("application/json");

        String accessToken = get(on(' ').split(request.headers("Authorization")), 1);
        String parentFolderIdParam = request.params(":folderId");
        try {
            FolderId parentFolderId = new FolderId(parentFolderIdParam);

            CreateFolder createFolderCommand = new CreateFolder(parentFolderId);

            FolderMetadataRecord createdFolder = new FolderCreation(folderMetadataStorage)
                    .createFolder(createFolderCommand);

            return new Gson().toJson(new FolderDto(createdFolder));
        } catch (ItemIsNotFoundException e) {

            response.status(SC_NOT_FOUND);
            return "Folder was not found";
        }
    }
}
