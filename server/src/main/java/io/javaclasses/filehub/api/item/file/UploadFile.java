package io.javaclasses.filehub.api.item.file;

import io.javaclasses.filehub.storage.item.file.FileMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * An intention of the client to upload file {@linkplain FileMetadataRecord} in a folder {@linkplain FolderMetadataRecord}.
 */
public final class UploadFile {
    /**
     * An object that contains information about the uploading file(name, size, content, content-type, etc.).
     */
    private final UploadingFileInfo fileInfo;
    /**
     * An identifier of the parent folder for the uploading file.
     */
    private final FolderId parentFolderId;
    /**
     * An identifier of the {@link User} who is uploading the file.
     */
    private final UserId ownerId;

    /**
     * Creates new UploadFile command instance.
     *
     * @param fileInfo       the information about uploading file.
     * @param parentFolderId an identifier of the parent folder.
     * @param ownerId        an identifier of the user who is uploading the file.
     */
    public UploadFile(UploadingFileInfo fileInfo, FolderId parentFolderId, UserId ownerId) {
        this.fileInfo = checkNotNull(fileInfo);
        this.parentFolderId = checkNotNull(parentFolderId);
        this.ownerId = checkNotNull(ownerId);
    }

    /**
     * Returns the information about the uploading file.
     *
     * @return the information about file.
     */
    public UploadingFileInfo fileInfo() {
        return fileInfo;
    }

    /**
     * Returns an identifier of the parent folder.
     *
     * @return an identifier of the parent folder.
     */
    public FolderId parentFolderId() {
        return parentFolderId;
    }

    /**
     * Returns an identifier of the user who is uploading the file.
     *
     * @return an identifier of the user who is uploading the file.
     */
    public UserId ownerId() {
        return ownerId;
    }
}
