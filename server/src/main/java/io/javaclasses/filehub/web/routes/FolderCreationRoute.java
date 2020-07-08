package io.javaclasses.filehub.web.routes;

import com.google.gson.Gson;
import io.javaclasses.filehub.api.item.folder.CreateFolder;
import io.javaclasses.filehub.api.item.folder.FolderCreation;
import io.javaclasses.filehub.api.item.folder.FolderDto;
import io.javaclasses.filehub.api.item.folder.ItemIsNotFoundException;
import io.javaclasses.filehub.api.user.CurrentUserIdHolder;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static javax.servlet.http.HttpServletResponse.SC_NOT_FOUND;
import static javax.servlet.http.HttpServletResponse.SC_OK;

/**
 * An implementation of {@link Route} that handles requests for folder creation.
 */
public class FolderCreationRoute implements Route {
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
     * <p>Sets 404 to {@code response.status()} if folder where new folder is being created is not found.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) {
        response.type("application/json");
        try {
            CreateFolder createFolderCommand = readCommand(request);
            FolderCreation folderCreationProcess = getFolderCreationProcess();

            FolderDto createdFolder = folderCreationProcess.handle(createFolderCommand);

            response.status(SC_OK);
            return createJsonResponseBody(createdFolder);
        } catch (ItemIsNotFoundException e) {
            response.status(SC_NOT_FOUND);
            return "Folder was not found";
        }
    }

    /**
     * Returns new {@link CreateFolder} instance parsing {@code request} path parameter.
     *
     * @param request object with information from request.
     * @return command with information from request.
     */
    private CreateFolder readCommand(Request request) {
        String parentFolderIdParam = request.params(":folderId");
        return new CreateFolder(new FolderId(parentFolderIdParam), CurrentUserIdHolder.get());
    }

    /**
     * Returns folder creation process.
     *
     * @return {@link FolderCreation} instance.
     */
    private FolderCreation getFolderCreationProcess() {
        return new FolderCreation(folderMetadataStorage);
    }

    /**
     * Returns string JSON from {@code folderDto}.
     *
     * @param folderDto object for serialization.
     * @return JSON from {@code folderDto}.
     */
    private String createJsonResponseBody(FolderDto folderDto) {
        return new Gson().toJson(folderDto);
    }
}
