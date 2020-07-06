package io.javaclasses.filehub.storage.item.folder;

import io.javaclasses.filehub.storage.InMemoryStorage;

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
}
