package io.javaclasses.filehub.storage.item.file;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.RecordId;

/**
 * An identifier for {@link FileMetadataRecord}.
 */
@Immutable
public final class FileId extends RecordId {
    /**
     * Creates new FileId instance.
     *
     * @param value an identifier value.
     */
    public FileId(String value) {
        super(value);
    }
}
