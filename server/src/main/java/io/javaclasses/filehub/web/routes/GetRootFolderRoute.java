package io.javaclasses.filehub.web.routes;

import io.javaclasses.filehub.api.item.folder.GetRootFolderId;
import io.javaclasses.filehub.api.item.folder.RootFolderIdView;
import io.javaclasses.filehub.api.user.CurrentUserIdHolder;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.User;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static javax.servlet.http.HttpServletResponse.SC_OK;

/**
 * An implementation of {@link Route} that handles requests for getting of {@link User}`s root folder identifier.
 */
public class GetRootFolderRoute implements Route {
    /**
     * The storage for folders {@link FolderMetadataRecord}.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * Creates a new GetRootFolderRoute instance.
     *
     * @param folderMetadataStorage the storage for all folders.
     */
    public GetRootFolderRoute(FolderMetadataStorage folderMetadataStorage) {
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
    }

    /**
     * Handles request for getting of root folder identifier.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) {
        GetRootFolderId getRootQuery = readQuery();
        RootFolderIdView rootIdView = getRootIdView();

        FolderId rootFolderId = rootIdView.process(getRootQuery);

        response.status(SC_OK);
        return createResponse(rootFolderId);
    }

    /**
     * Returns a {@link GetRootFolderId} query instance.
     *
     * @return GetRootFolderId instance.
     */
    private GetRootFolderId readQuery() {
        return new GetRootFolderId(CurrentUserIdHolder.get());
    }

    /**
     * Returns a {@link RootFolderIdView} view instance.
     *
     * @return RootFolderIdView instance.
     */
    private RootFolderIdView getRootIdView() {
        return new RootFolderIdView(folderMetadataStorage);
    }

    /**
     * Creates the response string using an identifier of the root folder.
     *
     * @param rootFolderId received identifier of the root folder from processing of {@link GetRootFolderId} query.
     * @return identifier value.
     */
    private String createResponse(FolderId rootFolderId) {
        return rootFolderId.value();
    }
}
