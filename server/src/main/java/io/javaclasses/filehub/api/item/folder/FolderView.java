package io.javaclasses.filehub.api.item.folder;

import io.javaclasses.filehub.api.View;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.UserId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;
import static java.lang.String.format;

/**
 * The application view that processes {@link GetFolder} query and retrieves
 * a folder {@link FolderMetadataRecord} by its identifier.
 */
public class FolderView implements View<GetFolder, FolderDto> {
    /**
     * The instance of {@link Logger} for FolderView class.
     */
    private static final Logger logger = LoggerFactory.getLogger(FolderView.class);

    /**
     * Storage for {@link FolderMetadataRecord}s.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * Creates new FolderView instance.
     *
     * @param folderMetadataStorage storage for folders.
     */
    public FolderView(FolderMetadataStorage folderMetadataStorage) {
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
    }

    /**
     * Processes {@link GetFolder} query from client and returns found folder.
     *
     * @param query client`s query to get a folder.
     * @return DTO of the found folder.
     * @throws NotFoundException if a folder is not found by identifier or current user does not have this folder.
     */
    @Override
    public FolderDto process(GetFolder query) {
        checkNotNull(query);
        FolderId folderId = query.folderId();
        UserId ownerId = query.ownerId();

        Optional<FolderMetadataRecord> foundFolder = getFolder(folderId, ownerId);

        if (foundFolder.isEmpty()) {
            notFoundFolderScenario(folderId, ownerId);
        }

        if (logger.isInfoEnabled()) {
            logger.info("User with id: {} retrieved folder with id: {} ", ownerId.value(), folderId.value());
        }

        return createFolderDto(foundFolder.orElse(null));
    }

    /**
     * Executes the scenario when the requested folder is not found.
     *
     * @param folderId an identifier of not found folder.
     * @param ownerId  an identifier of the owner of the not found folder.
     * @throws NotFoundException the exception for the not found folder.
     */
    private void notFoundFolderScenario(FolderId folderId, UserId ownerId) throws NotFoundException {
        if (logger.isInfoEnabled()) {
            logger.info("User with id: {} does not have folder with id: {}", ownerId, folderId);
        }
        throw new NotFoundException(
                format("User with id: %s does not have folder with id: %s", folderId.value(), ownerId.value()));
    }

    /**
     * Returns DTO for {@code foundFolder}.
     *
     * @param foundFolder the folder that is found by its identifier and identifier of the owner.
     * @return DTO for {@code foundFolder}.
     */
    private FolderDto createFolderDto(FolderMetadataRecord foundFolder) {
        return new FolderDto(foundFolder);
    }

    /**
     * Returns a folder that is found by its identifier and identifier of the owner.
     *
     * @param folderId an identifier of the folder.
     * @param ownerId  an identifier of the owner.
     * @return found folder of {@link Optional#empty()}.
     */
    private Optional<FolderMetadataRecord> getFolder(FolderId folderId, UserId ownerId) {
        return folderMetadataStorage.find(folderId, ownerId);
    }
}
