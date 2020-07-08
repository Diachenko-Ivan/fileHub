package io.javaclasses.filehub.storage.item;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A value object for file or folder {@link FolderMetadataRecord} name.
 */
@Immutable
public final class ItemName {
    /**
     * Contains the name of the item.
     */
    private final String value;

    /**
     * Create new {@link ItemName} instance.
     *
     * @param value an item name.
     */
    public ItemName(String value) {
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
}
