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

import java.util.Optional;
import java.util.Set;

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
     * Name of root folder for each user {@link User}.
     */
    private static final String ROOT_FOLDER_NAME = "Root";
    /**
     * Name of newly created folder.
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
     * Creates new folder handling {@link CreateFolder} command.
     *
     * @param createFolderCommand command to create a new folder.
     * @return created folder.
     * @throws ItemIsNotFoundException if parent folder, where new folder is being created in, is not found
     * or user does not have this folder.
     */
    public FolderMetadataRecord createFolder(CreateFolder createFolderCommand) {
        FolderId parentFolderId = createFolderCommand.parentFolderId();
        UserId ownerId = createFolderCommand.ownerId();

        if (parentFolderId == null) {
            return createRootFolder(createFolderCommand);
        }

        Optional<FolderMetadataRecord> folderMetadataRecord = folderMetadataStorage.find(parentFolderId);

        if (!(folderMetadataRecord.isPresent()
                && folderMetadataRecord.get().ownerId().equals(ownerId))) {
            if (logger.isWarnEnabled()) {
                logger.warn("User with id: {} does not have folder with id: {}", ownerId, parentFolderId);
            }
            throw new ItemIsNotFoundException("User with id " + ownerId
                    + " does not have folder with id: " + parentFolderId + " .");
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
            logger.info("New folder was created in the folder with id: {} ", createFolderCommand.parentFolderId());
        }
        return folderToAdd;
    }

    /**
     * Creates user`s root folder handling {@link CreateFolder} command.
     *
     * @param createFolderCommand command to create a new folder.
     * @return created root folder.
     * @throws IllegalArgumentException if user already has the root folder.
     */
    private FolderMetadataRecord createRootFolder(CreateFolder createFolderCommand) {
        Set<FolderMetadataRecord> rootFolders = folderMetadataStorage.findAll(null);

        rootFolders.stream()
                .filter((rootFolder) -> rootFolder.ownerId().equals(createFolderCommand.ownerId()))
                .findFirst()
                .ifPresent((existentRootFolder) -> {
                    throw new IllegalArgumentException("Failed to create user root folder. This user already has root folder.");
                });

        FolderMetadataRecord rootFolder = new FolderMetadataRecord(
                new FolderId(generateId()),
                new ItemName(ROOT_FOLDER_NAME),
                new UserId(createFolderCommand.ownerId().value()),
                new FileItemCount(0),
                null
        );
        folderMetadataStorage.add(rootFolder);
        System.out.println(rootFolder.id());
        if (logger.isInfoEnabled()) {
            logger.info("Root folder for user with id: {} was created. ", createFolderCommand.ownerId().value());
        }

        return rootFolder;
    }
}
