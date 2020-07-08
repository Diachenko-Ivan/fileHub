package io.javaclasses.filehub.api.item.folder;

import io.javaclasses.filehub.api.View;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;

/**
 *
 */
public class FolderView implements View<GetFolder, FolderDto> {

    private final FolderMetadataStorage folderMetadataStorage;

    public FolderView(FolderMetadataStorage folderMetadataStorage) {
        this.folderMetadataStorage = folderMetadataStorage;
    }

    @Override
    public FolderDto process(GetFolder query) {
        return null;
    }
}
