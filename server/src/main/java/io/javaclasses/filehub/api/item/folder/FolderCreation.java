package io.javaclasses.filehub.api.item.folder;

import io.javaclasses.filehub.api.Process;
import io.javaclasses.filehub.storage.item.ItemName;
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
import static io.javaclasses.filehub.api.item.folder.NewFolderNameGenerator.generateName;
import static java.util.stream.Collectors.toSet;

/**
 * The application process that handles {@link CreateFolder} command and performs folder creation functionality.
 */
public class FolderCreation implements Process {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(FolderCreation.class);
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
    public FolderDto handle(CreateFolder createFolderCommand) {
        checkNotNull(createFolderCommand);
        FolderId parentFolderId = createFolderCommand.parentFolderId();
        UserId ownerId = createFolderCommand.ownerId();

        Optional<FolderMetadataRecord> parentFolderMetadata = folderMetadataStorage.find(parentFolderId, ownerId);

        if (!parentFolderMetadata.isPresent()) {
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

        return new FolderDto(createdFolder, 0);
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
                createNewFolderName(parentFolderId),
                ownerId,
                parentFolderId
        );
    }

    /**
     * Creates a unique name of the new folder from the set of folders with {@code parentId}.
     *
     * @param parentId an identifier of the parent folder.
     * @return new generated name.
     */
    private ItemName createNewFolderName(FolderId parentId) {
        Set<String> existingFolderNames = folderMetadataStorage.findAll(parentId)
                .stream()
                .map((folder) -> folder.folderName().value())
                .collect(toSet());
        return new ItemName(generateName(existingFolderNames));
    }
}
