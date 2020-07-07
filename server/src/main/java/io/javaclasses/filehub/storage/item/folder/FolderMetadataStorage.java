package io.javaclasses.filehub.storage.item.folder;

import io.javaclasses.filehub.storage.InMemoryStorage;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;

import java.util.Optional;
import java.util.Set;

import static com.google.common.base.Preconditions.checkNotNull;
import static java.util.stream.Collectors.toSet;

/**
 * An implementation of in-memory application storage for folders {@link FolderMetadataStorage}.
 */
public class FolderMetadataStorage extends
        InMemoryStorage<FolderId, FolderMetadataRecord> {

    /**
     * Returns the set of folders found by {@code parentFolderId}.
     *
     * @param parentFolderId identifier of parent folder.
     * @return set of folders whose identifier of parent folder is equal to {@code parentFolderId}.
     */
    public synchronized Set<FolderMetadataRecord> findAll(FolderId parentFolderId) {
        checkNotNull(parentFolderId);
        return this.records()
                .values()
                .stream()
                .filter((folder) -> folder.parentFolderId().equals(parentFolderId))
                .collect(toSet());
    }

    /**
     * Returns the root folder for the concrete user.
     *
     * @param ownerId an identifier of the root folder owner.
     * @return root folder for {@link User}.
     */
    public synchronized Optional<FolderMetadataRecord> findRoot(UserId ownerId) {
        checkNotNull(ownerId);
        return this.records()
                .values()
                .stream()
                .filter((folder) -> folder.ownerId().equals(ownerId) && folder.parentFolderId() == null)
                .findAny();
    }
}
