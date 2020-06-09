package io.javaclasses.filehub.web.item.folder;

import java.io.FileNotFoundException;

/**
 * Used for getting of single folder DTO.
 */
public interface GetFolderService {
    /**
     * Returns folder with specific id.
     *
     * @param folderId id of folder that is going to be returned.
     * @return DTO of folder.
     * @throws FileNotFoundException if folder with id that is equal to {@code folderId} is not found.
     */
    FolderDto folder(String folderId) throws FileNotFoundException;
}
