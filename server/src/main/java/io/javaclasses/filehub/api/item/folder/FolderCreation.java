package io.javaclasses.filehub.api.item.folder;

import io.javaclasses.filehub.api.Process;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.item.folder.FileItemCount;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.IdGenerator.generateId;

/**
 * The application process that handles {@link CreateFolder} command and provides folder creation functionality.
 */
public class FolderCreation implements Process {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(FolderCreation.class);
    /**
     * The name of the newly created folder.
     */
    private static final String NEW_FOLDER_NAME = "New Folder";
    /**
     * Storage for {@link FolderMetadataRecord}.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * Creates new {@link FolderCreation} instance.
     *
     * @param folderMetadataStorage storage for {@link FolderMetadataRecord}.
     */
    public FolderCreation(FolderMetadataStorage folderMetadataStorage) {
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
    }

    /**
     * Creates a new folder handling {@link CreateFolder} command.
     *
     * @param createFolderCommand a command to create a new folder.
     * @return created folder.
     * @throws ItemIsNotFoundException if parent folder, where new folder is being created in, is not found
     *                                 or the user does not have this folder.
     */
    public FolderMetadataRecord handle(CreateFolder createFolderCommand) {
        checkNotNull(createFolderCommand);
        FolderId parentFolderId = createFolderCommand.parentFolderId();
        UserId ownerId = createFolderCommand.ownerId();

        FolderMetadataRecord parentFolderMetadata = folderMetadataStorage.find(parentFolderId).orElse(null);

        if (folderExists(ownerId, parentFolderMetadata)) {
            if (logger.isInfoEnabled()) {
                logger.info("User with id: {} does not have folder with id: {}", ownerId, parentFolderId);
            }
            throw new ItemIsNotFoundException("User with id " + ownerId
                    + " does not have folder with id: " + parentFolderId + ".");
        }

        FolderMetadataRecord createdFolder = newFolderWithParentIdAndOwnerId(parentFolderId, ownerId);

        folderMetadataStorage.add(createdFolder);

        if (logger.isInfoEnabled()) {
            logger.info("New folder was created in the folder with id: {} ", parentFolderId);
        }
        return createdFolder;
    }

    /**
     * Returns the new {@link FolderMetadataRecord}.
     *
     * @param parentFolderId an identifier of the parent folder.
     * @param ownerId        an identifier of the folder owner {@link User}.
     * @return new {@link FolderMetadataRecord} instance.
     */
    private FolderMetadataRecord newFolderWithParentIdAndOwnerId(FolderId parentFolderId, UserId ownerId) {
        return new FolderMetadataRecord(
                new FolderId(generateId()),
                new ItemName(NEW_FOLDER_NAME),
                ownerId,
                new FileItemCount(0),
                parentFolderId
        );
    }

    /**
     * Checks the existence of {@code parentFolderMetadata} and its possessiveness to {@link User} with {@code ownerId}.
     *
     * @param ownerId              an identifier of the owner.
     * @param parentFolderMetadata an identifier of the parent folder.
     * @return true if conditions are met.
     */
    private boolean folderExists(UserId ownerId, FolderMetadataRecord parentFolderMetadata) {
        return !(parentFolderMetadata != null && parentFolderMetadata.ownerId().equals(ownerId));
    }
}
