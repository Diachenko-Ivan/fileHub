package io.javaclasses.filehub.web.item.folder;

import java.io.FileNotFoundException;

/**
 * Used for folder renaming.
 */
public interface RenameFolderProcess {
    /**
     * Renames folder depending on its id.
     *
     * @param folderDto DTO of renamed folder.
     * @return DTO of renamed folder.
     * @throws FileNotFoundException if folder with id that is equal to {@code folderDto.id} is not found.
     */
    FolderDto rename(FolderDto folderDto) throws FileNotFoundException;
}
