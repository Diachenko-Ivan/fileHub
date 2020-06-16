package io.javaclasses.filehub.api.item.folder;

import java.io.FileNotFoundException;

/**
 * Used for new folder creation.
 */
public interface CreateFolderProcess {
    /**
     * Creates new folder in the folder with id that is equal to {@code parentFolderId}.
     *
     * @param parentFolderId id of parent folder where new folder is being created.
     * @return DTO of new created folder.
     * @throws FileNotFoundException if parent folder with id {@code parentFolderId} is not found.
     */
    FolderDto createFolder(String parentFolderId) throws FileNotFoundException;
}
