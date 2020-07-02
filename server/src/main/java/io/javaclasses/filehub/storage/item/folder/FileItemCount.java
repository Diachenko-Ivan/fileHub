package io.javaclasses.filehub.storage.item.folder;

import com.google.errorprone.annotations.Immutable;

import static com.google.common.base.Preconditions.checkArgument;

/**
 * Value object that represents a number of file items in folder {@link FolderMetadataRecord}.
 */
@Immutable
public final class FileItemCount {
    /**
     * Contains a number that is a file count.
     */
    private final long value;

    /**
     * Contains new {@link FileItemCount} validating {@code value}.
     *
     * @param value number of file items.
     */
    public FileItemCount(long value) {
        checkArgument(value >= 0, "Files count can not be negative.");
        this.value = value;
    }

    /**
     * Getter for a number of file items.
     *
     * @return number of items.
     */
    public long value() {
        return value;
    }
}
