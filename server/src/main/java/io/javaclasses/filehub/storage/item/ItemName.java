package io.javaclasses.filehub.storage.item;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;

/**
 * Value object for file or folder {@link FolderMetadataRecord} name.
 */
@Immutable
public final class ItemName {
    /**
     * Contains name of item.
     */
    private final String value;

    /**
     * Create new {@link ItemName} instance.
     *
     * @param value item name.
     */
    public ItemName(String value) {
        this.value = value;
    }

    /**
     * Getter for item name value.
     *
     * @return item name.
     */
    public String value() {
        return value;
    }
}
