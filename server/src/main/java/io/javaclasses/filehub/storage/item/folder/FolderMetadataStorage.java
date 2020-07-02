package io.javaclasses.filehub.storage.item.folder;

import io.javaclasses.filehub.storage.InMemoryStorage;

import javax.annotation.Nullable;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * An implementation of in-memory application storage for folders {@link FolderMetadataStorage}.
 */
public class FolderMetadataStorage extends
        InMemoryStorage<FolderId, FolderMetadataRecord> {

    /**
     * Returns the set of folders found by {@code ownerId} and {@code parentFolderId}.
     *
     * @param parentFolderId identifier of parent folder.
     * @return set of folders whose identifier of parent folder are equal to {@code parentFolderId}.
     */
    public Set<FolderMetadataRecord> findAll(@Nullable FolderId parentFolderId) {
        return this.records()
                .values()
                .stream()
                .filter((folder) -> folder.parentFolderId().equals(parentFolderId))
                .collect(Collectors.toSet());
    }
}
