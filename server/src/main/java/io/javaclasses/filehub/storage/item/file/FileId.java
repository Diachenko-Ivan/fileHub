package io.javaclasses.filehub.storage.item.file;

import io.javaclasses.filehub.storage.RecordId;

import javax.annotation.concurrent.Immutable;

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
