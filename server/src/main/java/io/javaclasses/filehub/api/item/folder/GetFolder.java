package io.javaclasses.filehub.api.item.folder;

import io.javaclasses.filehub.api.Query;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.user.UserId;

public class GetFolder implements Query {

    private final FolderId folderId;
    private final UserId ownerId;

    public GetFolder(FolderId folderId, UserId ownerId) {
        this.folderId = folderId;
        this.ownerId = ownerId;
    }
}
