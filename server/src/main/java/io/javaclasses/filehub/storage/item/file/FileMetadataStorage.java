package io.javaclasses.filehub.storage.item.file;

import io.javaclasses.filehub.storage.InMemoryStorage;
import io.javaclasses.filehub.storage.item.folder.FolderId;

import java.util.Set;

import static com.google.common.base.Preconditions.checkNotNull;
import static java.util.stream.Collectors.toSet;

/**
 * An application storage for files {@link FileMetadataRecord}.
 * <p>Based on implementation of in-memory storage.</p>
 */
public class FileMetadataStorage extends InMemoryStorage<FileId, FileMetadataRecord> {

    /**
     * Returns the set of files whose parent folder identifier is equal to {@code parentFolderId}.
     *
     * @param parentFolderId identifier of parent folder.
     * @return set of file with {@code parentFolderId}.
     */
    public synchronized Set<FileMetadataRecord> findAll(FolderId parentFolderId) {
        checkNotNull(parentFolderId);
        return this.records()
                .values()
                .stream()
                .filter((file) -> parentFolderId.equals(file .parentFolderId()))
                .collect(toSet());
    }
}
