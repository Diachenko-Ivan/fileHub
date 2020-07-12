package io.javaclasses.filehub.api.item.folder;

import io.javaclasses.filehub.api.View;
import io.javaclasses.filehub.api.item.file.FileDto;
import io.javaclasses.filehub.storage.item.file.FileMetadataRecord;
import io.javaclasses.filehub.storage.item.file.FileMetadataStorage;
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
import static java.lang.String.format;

/**
 * The application view that processes {@link GetFolderContent} query.
 * Retrieves the folder content {@link FolderContent} from concrete folder {@link FolderMetadataRecord}.
 */
public class FolderContentView implements View<GetFolderContent, FolderContent> {

    private static final Logger logger = LoggerFactory.getLogger(FolderContentView.class);

    /**
     * Storage for folders {@link FolderMetadataRecord}.
     */
    private final FolderMetadataStorage folderMetadataStorage;
    /**
     * Storage for files {@link FileMetadataRecord}.
     */
    private final FileMetadataStorage fileMetadataStorage;

    /**
     * Creates new FolderContentView instance.
     *
     * @param folderMetadataStorage storage for folders.
     * @param fileMetadataStorage   storage for files.
     */
    public FolderContentView(FolderMetadataStorage folderMetadataStorage, FileMetadataStorage fileMetadataStorage) {
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
        this.fileMetadataStorage = checkNotNull(fileMetadataStorage);
    }

    /**
     * Handles {@link GetFolderContent} query and returns the content of the folder with {@code folderId} identifier.
     *
     * @param query client query to retrieve content from folder.
     * @return folder content.
     * @throws NotFoundException if the folder is not found by an identifier or current user does not have this folder.
     */
    @Override
    public FolderContent process(GetFolderContent query) {
        checkNotNull(query);
        FolderId parentFolderId = query.folderId();
        UserId ownerId = query.ownerId();

        Optional<FolderMetadataRecord> folderWithContent = getParentFolder(parentFolderId, ownerId);

        if (folderWithContent.isEmpty()) {
            if (logger.isInfoEnabled()) {
                logger.info("User with id: {} does not have folder with id: {}", ownerId, parentFolderId);
            }
            throw new NotFoundException(
                    format("User with id: %s does not have folder with id: %s", parentFolderId.value(), ownerId.value()));
        }

        Set<FolderMetadataRecord> childFolders = getFolders(parentFolderId);
        Set<FileMetadataRecord> childFiles = getFiles(parentFolderId);

        if (logger.isInfoEnabled()) {
            logger.info("User with id: {} retrieved data from folder {}", ownerId, folderWithContent.get());
        }
        return createFolderContent(childFolders, childFiles);
    }

    /**
     * Returns the folder that is found by {@code folderId} and {@code ownerId}.
     *
     * @param folderId an identifier of the folder.
     * @param ownerId  na identifier of the owner {@link User} of the folder.
     * @return found folder or {@link Optional#empty()}.
     */
    private Optional<FolderMetadataRecord> getParentFolder(FolderId folderId, UserId ownerId) {
        return folderMetadataStorage.find(folderId, ownerId);
    }

    /**
     * Returns the set of files in the folder with an identifier {@code parentFolderId}.
     *
     * @param parentFolderId an identifier of the folder with the requested files.
     * @return found files.
     */
    private Set<FileMetadataRecord> getFiles(FolderId parentFolderId) {
        return fileMetadataStorage.findAll(parentFolderId);
    }

    /**
     * Returns the set of folders in the folder with an identifier {@code parentFolderId}.
     *
     * @param parentFolderId an identifier of the folder with the requested folders.
     * @return found folders.
     */
    private Set<FolderMetadataRecord> getFolders(FolderId parentFolderId) {
        return folderMetadataStorage.findAll(parentFolderId);
    }

    /**
     * Returns {@link FolderContent} from {@code subFolders} and {@code files}.
     *
     * @param subFolders a set of child folders.
     * @param files      a set of child files.
     * @return {@link FolderContent} instance.
     */
    private FolderContent createFolderContent(Set<FolderMetadataRecord> subFolders, Set<FileMetadataRecord> files) {
        FolderDto[] childFolders = subFolders.stream()
                .map(FolderDto::new)
                .toArray(FolderDto[]::new);

        FileDto[] childFiles = files.stream()
                .map(FileDto::new)
                .toArray(FileDto[]::new);

        return new FolderContent(childFolders, childFiles);
    }
}
