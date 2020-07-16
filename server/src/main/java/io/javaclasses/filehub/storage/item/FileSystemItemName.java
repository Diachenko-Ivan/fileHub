package io.javaclasses.filehub.storage.item;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A value object for file or folder {@link FolderMetadataRecord} name.
 */
@Immutable
public final class FileSystemItemName {
    /**
     * Contains the name of the item.
     */
    private final String value;

    /**
     * Create new {@link FileSystemItemName} instance.
     *
     * @param value an item name.
     */
    public FileSystemItemName(String value) {
        this.value = checkNotNull(value);
    }

    /**
     * Getter for item name value.
     *
     * @return item name.
     */
    public String value() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }
}
