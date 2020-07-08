package io.javaclasses.filehub.storage.item.folder;

import com.google.errorprone.annotations.Immutable;

import static com.google.common.base.Preconditions.checkArgument;

/**
 * The value object for the size of {@link FileMetadataRecord}.
 */
@Immutable
public final class FileSize {
    /**
     * File size in bytes.
     */
    private final long value;

    /**
     * Creates new FileSize instance validating {@code value}.
     *
     * @param value file size in bytes.
     */
    public FileSize(long value) {
        checkArgument(value >= 0, "File size can not be negative.");
        this.value = value;
    }

    /**
     * Getter for the file size value.
     *
     * @return file size in bytes.
     */
    public long value() {
        return value;
    }
}
