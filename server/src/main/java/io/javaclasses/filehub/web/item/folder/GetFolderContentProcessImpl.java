package io.javaclasses.filehub.web.item.folder;

import io.javaclasses.filehub.web.item.ItemDto;

/**
 * Implements functionality for getting one folder content from file system.
 */
public class GetFolderContentProcessImpl implements GetFolderContentProcess {
    /**
     * {@inheritDoc}
     */
    @Override
    public ItemDto[] content(String folderId) {
        return new ItemDto[0];
    }
}
