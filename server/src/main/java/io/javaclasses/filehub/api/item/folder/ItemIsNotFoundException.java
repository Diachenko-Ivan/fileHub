package io.javaclasses.filehub.api.item.folder;

import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * An exception that is thrown when file or folder {@link FolderMetadataRecord} is not found.
 */
public class ItemIsNotFoundException extends RuntimeException {
    /**
     * Creates new ItemIsNotFoundException instance.
     *
     * @param message provided error message.
     */
    public ItemIsNotFoundException(String message) {
        super(checkNotNull(message));
    }
}
