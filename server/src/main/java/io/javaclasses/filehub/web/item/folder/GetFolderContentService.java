package io.javaclasses.filehub.web.item.folder;

import io.javaclasses.filehub.web.item.ItemDto;

import java.io.FileNotFoundException;

/**
 * Used for getting of folder content.
 */
public interface GetFolderContentService {
    /**
     * Returns folder content where folder id is equal to {@code folderId}.
     *
     * @param folderId id of folder which content is going to be taken.
     * @return array of item DTOs.
     * @throws FileNotFoundException if folder with id that is equal to {@code folderId} is not found.
     */
    ItemDto[] content(String folderId) throws FileNotFoundException;
}
