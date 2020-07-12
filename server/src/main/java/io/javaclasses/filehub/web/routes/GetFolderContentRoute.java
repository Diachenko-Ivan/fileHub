package io.javaclasses.filehub.web.routes;

import com.google.gson.Gson;
import io.javaclasses.filehub.api.item.folder.FolderContent;
import io.javaclasses.filehub.api.item.folder.FolderContentView;
import io.javaclasses.filehub.api.item.folder.GetFolderContent;
import io.javaclasses.filehub.api.item.folder.NotFoundException;
import io.javaclasses.filehub.api.user.CurrentUserIdHolder;
import io.javaclasses.filehub.storage.item.file.FileMetadataRecord;
import io.javaclasses.filehub.storage.item.file.FileMetadataStorage;
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
 * An implementation of the {@link Route} that handles requests to retrieve folder content.
 */
public class GetFolderContentRoute implements Route {
    /**
     * Storage for {@link FileMetadataRecord}.
     */
    private final FileMetadataStorage fileMetadataStorage;
    /**
     * Storage for {@link FolderMetadataRecord}.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * Create new GetFolderContentRoute instance.
     *
     * @param fileMetadataStorage   storage for files.
     * @param folderMetadataStorage storage for folders.
     */
    public GetFolderContentRoute(FileMetadataStorage fileMetadataStorage, FolderMetadataStorage folderMetadataStorage) {
        this.fileMetadataStorage = checkNotNull(fileMetadataStorage);
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
    }

    /**
     * Handles requests to retrieve folder content.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) {
        response.type("application/json");
        try {
            GetFolderContent query = readQuery(request);
            FolderContentView view = createFolderContentView();

            FolderContent folderContent = view.process(query);
            response.status(SC_OK);
            return createJsonResponseBody(folderContent);
        } catch (NotFoundException e) {

            response.status(SC_NOT_FOUND);
            return "Folder is not found.";
        }
    }

    /**
     * Returns JSON for response body.
     *
     * @param folderContent object for serialization.
     * @return JSON string.
     */
    private String createJsonResponseBody(FolderContent folderContent) {
        return new Gson().toJson(folderContent);
    }

    /**
     * Returns {@link FolderContentView} view for processing of the {@link GetFolderContent} query.
     *
     * @return FolderContentView instance.
     */
    private FolderContentView createFolderContentView() {
        return new FolderContentView(folderMetadataStorage, fileMetadataStorage);
    }

    /**
     * Returns new {@link GetFolderContent} instance parsing {@code request} path parameters.
     *
     * @param request object with information from HTTP request.
     * @return GetFolderContent query.
     */
    private GetFolderContent readQuery(Request request) {
        String folderIdParam = request.params(":folderId");
        return new GetFolderContent(new FolderId(folderIdParam), CurrentUserIdHolder.get());
    }
}
