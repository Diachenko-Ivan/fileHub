package io.javaclasses.filehub.api.item.file;

import io.javaclasses.filehub.api.Process;
import io.javaclasses.filehub.api.item.folder.FolderNotFoundException;
import io.javaclasses.filehub.api.item.folder.ForbiddenAccessToFolderException;
import io.javaclasses.filehub.storage.item.file.FileContentRecord;
import io.javaclasses.filehub.storage.item.file.FileContentStorage;
import io.javaclasses.filehub.storage.item.file.FileId;
import io.javaclasses.filehub.storage.item.file.FileMetadataRecord;
import io.javaclasses.filehub.storage.item.file.FileMetadataStorage;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.UserId;
import org.slf4j.Logger;

import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.IdGenerator.generateId;
import static java.lang.String.format;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * The application process that handles {@link UploadFile} command.
 * <p>Uploads file in the folder.
 */
public class FileUploading implements Process {
    /**
     * The instance of {@link Logger} for FileUploading class.
     */
    private static final Logger logger = getLogger(FileUploading.class);
    /**
     * Storage for {@link FileMetadataRecord}.
     */
    private final FileMetadataStorage fileMetadataStorage;
    /**
     * Storage for {@link FolderMetadataRecord}.
     */
    private final FolderMetadataStorage folderMetadataStorage;
    /**
     * Storage for {@link FileContentRecord}.
     */
    private final FileContentStorage fileContentStorage;
    /**
     * The object to block access to {@link FileUploading#handle(UploadFile)} method.
     */
    private static final Object lock = new Object();

    /**
     * Creates new FileUploading instance.
     *
     * @param fileMetadataStorage   storage for file metadata.
     * @param folderMetadataStorage storage for folders.
     * @param fileContentStorage    storage for file content.
     */
    public FileUploading(FolderMetadataStorage folderMetadataStorage,
                         FileMetadataStorage fileMetadataStorage,
                         FileContentStorage fileContentStorage) {
        this.fileMetadataStorage = checkNotNull(fileMetadataStorage);
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
        this.fileContentStorage = checkNotNull(fileContentStorage);
    }

    /**
     * Uploads new file in the folder handling {@link UploadFile} command.
     * <p>Method is synchronized.
     *
     * @param command a command to upload the file in the folder.
     * @return DTO of the uploaded file.
     */
    public FileDto handle(UploadFile command) {
        synchronized (lock) {
            checkNotNull(command);

            FolderId parentFolderId = command.parentFolderId();
            UserId ownerId = command.ownerId();
            UploadingFileInfo fileInfo = command.fileInfo();

            FolderMetadataRecord parentFolder = getFolder(parentFolderId);

            verifyFolderOwner(parentFolder, ownerId);

            return saveFile(fileInfo, parentFolderId, ownerId);
        }
    }

    /**
     * Returns folder by its identifier.
     *
     * @param folderId an identifier of the requested folder.
     * @return found folder.
     * @throws FolderNotFoundException if folder with {@code folderId} does not exist.
     */
    private FolderMetadataRecord getFolder(FolderId folderId) {
        Optional<FolderMetadataRecord> folderMetadataRecord = folderMetadataStorage.find(folderId);
        if (folderMetadataRecord.isEmpty()) {
            if (logger.isInfoEnabled()) {
                logger.info("Folder with id: {} does not exist.", folderId);
            }
            throw new FolderNotFoundException(format("Folder with id: %s does not exist.", folderId));
        }
        return folderMetadataRecord.get();
    }

    /**
     * Checks if {@code folder} belongs to user with {@code ownerId} identifier.
     *
     * @param folder  an object with information about the folder.
     * @param ownerId an identifier of the folder owner.
     * @throws FolderNotFoundException if folder does not belong to user with {@code ownerId}.
     */
    private static void verifyFolderOwner(FolderMetadataRecord folder, UserId ownerId) {
        if (!folder.ownerId().equals(ownerId)) {
            if (logger.isInfoEnabled()) {
                logger.info("User with id: {} does not have folder with id: {}.", ownerId, folder.id());
            }
            throw new ForbiddenAccessToFolderException(
                    format("User with id: %s does not have folder with id: %s.", ownerId, folder.id()));
        }
    }

    /**
     * Saves file metadata and file content.
     *
     * @param fileInfo       an object with information about the file.
     * @param parentFolderId an identifier of the parent folder.
     * @param ownerId        an identifier of the file owner.
     * @return DTO of the uploaded file.
     */
    private FileDto saveFile(UploadingFileInfo fileInfo, FolderId parentFolderId, UserId ownerId) {
        FileId fileId = new FileId(generateId());
        FileMetadataRecord fileMetadata = new FileMetadataRecord(
                fileId,
                fileInfo.name(),
                parentFolderId,
                ownerId,
                fileInfo.mimeType(),
                fileInfo.size());

        FileContentRecord fileContent = new FileContentRecord(
                fileId,
                fileInfo.content()
        );

        fileMetadataStorage.add(fileMetadata);

        fileContentStorage.add(fileContent);

        if (logger.isInfoEnabled()) {
            logger.info("User with id: {} uploaded file with id: {} and name: {}.",
                    fileMetadata.ownerId(), fileMetadata.id(), fileMetadata.fileName());
        }

        return new FileDto(fileMetadata);
    }
}
