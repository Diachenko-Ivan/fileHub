package io.javaclasses.filehub.storage.item.file;

import io.javaclasses.filehub.storage.Record;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The data structure that stores the content for the file {@link FileMetadataRecord}.
 */
public final class FileContentRecord extends Record<FileId> {
    /**
     * Content of the file in the byte array.
     */
    private final byte[] content;

    /**
     * Creates new FileContentRecord instance.
     *
     * @param id      an identifier of the file.
     * @param content file content.
     */
    public FileContentRecord(FileId id, byte[] content) {
        super(id);
        this.content = checkNotNull(content);
    }

    /**
     * Returns file content in bytes.
     *
     * @return file content.
     */
    public byte[] content() {
        return content;
    }

    /**
     * Compares files by its identifiers.
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FileContentRecord that = (FileContentRecord) o;
        return Objects.equals(id(), that.id());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return Objects.hashCode(id());
    }
}
