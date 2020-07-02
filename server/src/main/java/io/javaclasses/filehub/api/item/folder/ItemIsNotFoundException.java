package io.javaclasses.filehub.api.item.folder;

import com.google.common.base.Preconditions;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;

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
        super(Preconditions.checkNotNull(message));
    }
}
