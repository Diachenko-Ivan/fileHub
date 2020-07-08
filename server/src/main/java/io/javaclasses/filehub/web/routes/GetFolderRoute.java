package io.javaclasses.filehub.web.routes;

import io.javaclasses.filehub.api.item.folder.FolderDto;
import io.javaclasses.filehub.api.item.folder.FolderView;
import io.javaclasses.filehub.api.item.folder.GetFolder;
import io.javaclasses.filehub.api.item.folder.ItemIsNotFoundException;
import io.javaclasses.filehub.api.user.CurrentUserIdHolder;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import spark.Request;
import spark.Response;
import spark.Route;

import static javax.servlet.http.HttpServletResponse.SC_NOT_FOUND;

public class GetFolderRoute implements Route {

    private final FolderMetadataStorage folderMetadataStorage;

    public GetFolderRoute(FolderMetadataStorage folderMetadataStorage) {
        this.folderMetadataStorage = folderMetadataStorage;
    }

    @Override
    public Object handle(Request request, Response response) {
        response.type("application/json");
        try {
            GetFolder query = readQuery(request);
            FolderView view = getFolderView();
            FolderDto folder = view.process(query);
        } catch (ItemIsNotFoundException e) {
            response.status(SC_NOT_FOUND);
            return "Folder is not found.";
        }
        return null;
    }

    private GetFolder readQuery(Request request) {
        String folderIdParam = request.params(":folderId");
        return new GetFolder(new FolderId(folderIdParam), CurrentUserIdHolder.get());
    }

    private FolderView getFolderView() {
        return new FolderView(folderMetadataStorage);
    }
}
