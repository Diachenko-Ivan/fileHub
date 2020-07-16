package io.javaclasses.filehub.web.routes;

import com.google.gson.Gson;
import io.javaclasses.filehub.api.item.folder.FolderDto;
import io.javaclasses.filehub.api.item.folder.FolderNotFoundException;
import io.javaclasses.filehub.api.item.folder.FolderView;
import io.javaclasses.filehub.api.item.folder.GetFolder;
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
 * An implementation for {@link Route} for handling requests for receiving folder.
 */
public class GetFolderRoute implements Route {
    /**
     * Storage for {@link FolderMetadataRecord}s.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * Creates new GetFolderRoute instance.
     *
     * @param folderMetadataStorage storage for folders.
     */
    public GetFolderRoute(FolderMetadataStorage folderMetadataStorage) {
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
    }

    /**
     * Handles requests to get the folder by its identifier.
     * <p>Sets 404 to {@code response.status()} if the folder does not exist.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) {
        response.type("application/json");
        try {
            GetFolder query = readQuery(request);
            FolderView view = createFolderView();

            FolderDto folder = view.process(query);
            response.status(SC_OK);
            return createJsonResponseBody(folder);
        } catch (FolderNotFoundException e) {

            response.status(SC_NOT_FOUND);
            return "Folder is not found.";
        }
    }

    /**
     * Returns new {@link GetFolder} instance parsing {@code request} path parameters.
     *
     * @param request object with information from request.
     * @return query instance.
     */
    private GetFolder readQuery(Request request) {
        String folderIdParam = request.params(":folderId");
        return new GetFolder(new FolderId(folderIdParam), CurrentUserIdHolder.get());
    }

    /**
     * Returns the view for processing of the {@link GetFolder} query.
     *
     * @return view instance.
     */
    private FolderView createFolderView() {
        return new FolderView(folderMetadataStorage);
    }

    /**
     * Returns JSON string for {@link Response} body.
     *
     * @param folder the object to parse into JSON.
     * @return JSON string.
     */
    private String createJsonResponseBody(FolderDto folder) {
        return new Gson().toJson(folder);
    }
}
