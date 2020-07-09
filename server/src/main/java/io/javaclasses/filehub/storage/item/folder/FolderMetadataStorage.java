package io.javaclasses.filehub.storage.item.folder;

import io.javaclasses.filehub.storage.InMemoryStorage;
import io.javaclasses.filehub.storage.user.UserId;

import java.util.Optional;
import java.util.Set;

import static com.google.common.base.Preconditions.checkNotNull;
import static java.util.stream.Collectors.toSet;

/**
 * An application storage for folders {@link FolderMetadataRecord}.
 * <p>An implementation of in-memory storage.</p>
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
     * Returns folder by its identifier and identifier of the owner.
     *
     * @param id      an identifier of the folder.
     * @param ownerId in identifier of the owner.
     * @return folder with the same {@code id} and {@code ownerId}.
     */
    public synchronized Optional<FolderMetadataRecord> find(FolderId id, UserId ownerId) {
        checkNotNull(id);
        checkNotNull(ownerId);
        return this.records()
                .values()
                .stream()
                .filter((folder) -> folder.id().equals(id) && folder.ownerId().equals(ownerId))
                .findAny();
    }
}
