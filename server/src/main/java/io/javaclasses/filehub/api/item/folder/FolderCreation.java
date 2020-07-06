package io.javaclasses.filehub.api.item.folder;

import io.javaclasses.filehub.api.Process;
import io.javaclasses.filehub.api.user.CurrentUserIdHolder;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.item.folder.FileItemCount;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.UserId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

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
     * The name of newly created folder.
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
     *                                 or user does not have this folder.
     */
    public FolderMetadataRecord handle(CreateFolder createFolderCommand) {
        FolderId parentFolderId = createFolderCommand.parentFolderId();
        UserId ownerId = CurrentUserIdHolder.get();

        Optional<FolderMetadataRecord> folderMetadataRecord = folderMetadataStorage.find(parentFolderId);

        if (!(folderMetadataRecord.isPresent() && folderMetadataRecord.get().ownerId().equals(ownerId))) {
            if (logger.isInfoEnabled()) {
                logger.info("User with id: {} does not have folder with id: {}", ownerId, parentFolderId);
            }
            throw new ItemIsNotFoundException("User with id " + ownerId
                    + " does not have folder with id: " + parentFolderId + ".");
        }

        FolderMetadataRecord folderToAdd = new FolderMetadataRecord(
                new FolderId(generateId()),
                new ItemName(NEW_FOLDER_NAME),
                ownerId,
                new FileItemCount(0),
                parentFolderId
        );

        folderMetadataStorage.add(folderToAdd);

        if (logger.isInfoEnabled()) {
            logger.info("New folder was created in the folder with id: {} ", parentFolderId);
        }
        return folderToAdd;
    }
}
