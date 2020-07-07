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

/**
 * The application view that processes {@link GetRootFolderId} command.
 * <p>Each user has a root folder. Method {@link #process(GetRootFolderId)} never returns <i>null</i>.
 * The scenario when the method throws an {@link NullPointerException} exception
 * indicates that an error has occurred in the FileHub application itself.
 */
public class RootFolderIdView implements View<GetRootFolderId, FolderId> {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(RootFolderIdView.class);

    /**
     * Storage for folders {@link FolderMetadataRecord}.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * Creates a new RootFolderIdView.
     *
     * @param folderMetadataStorage storage for all folders.
     */
    public RootFolderIdView(FolderMetadataStorage folderMetadataStorage) {
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
    }

    /**
     * Processes the {@link GetRootFolderId} query and returns an identifier of the root folder.
     *
     * @param getRootFolderId the query for getting of an identifier of the root folder.
     * @return an identifier of the root folder.
     * @throws NullPointerException if the user does not have a root folder.
     */
    @Override
    public FolderId process(GetRootFolderId getRootFolderId) {
        UserId ownerId = checkNotNull(getRootFolderId).ownerId();

        Optional<FolderMetadataRecord> rootFolderMetadata = folderMetadataStorage.findRoot(ownerId);
        if (!rootFolderMetadata.isPresent()) {

            throw new NullPointerException("The user with id " + ownerId.value() + " does not have the root folder.");
        }
        return rootFolderMetadata.get().id();
    }
}
