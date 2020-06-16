package io.javaclasses.filehub.api.item.folder;

/**
 * Used for getting of single folder DTO.
 */
public interface GetFolderProcess {
    /**
     * Returns folder with specific id.
     * <p>If folder with this id does not exist method returns <i>null</i>.
     *
     * @param folderId id of folder that is going to be returned.
     * @return DTO of folder.
     */
    FolderDto folder(String folderId);
}
