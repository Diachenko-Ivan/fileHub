package io.javaclasses.filehub.api.item.folder;

import io.javaclasses.filehub.api.item.ItemDto;

/**
 * Used for getting of folder content.
 */
public interface GetFolderContentProcess {
    /**
     * Returns folder content where folder id is equal to {@code folderId}.
     * <p>If folder with this id does not exist method returns <i>null</i>.
     *
     * @param folderId id of folder which content is going to be taken.
     * @return array of item DTOs.
     */
    ItemDto[] content(String folderId);
}
