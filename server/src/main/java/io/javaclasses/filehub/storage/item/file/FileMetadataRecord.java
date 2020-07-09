package io.javaclasses.filehub.storage.item.file;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.Record;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.user.UserId;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A data structure that contains information about file.
 */
@Immutable
public final class FileMetadataRecord extends Record<FileId> {
    /**
     * The name of file.
     */
    private final FileSystemItemName fileName;
    /**
     * An identifier of the parent folder {@link FolderMetadataRecord}.
     */
    private final FolderId parentFolderId;
    /**
     * An identifier for the file owner.
     */
    private final UserId ownerId;
    /**
     * Mime type for the file.
     */
    private final MimeType mimeType;
    /**
     * The size of file.
     */
    private final FileSize fileSize;

    /**
     * Creates new FileMetadataRecord instance.
     *
     * @param id             an identifier of the file.
     * @param fileName       a name of the file.
     * @param parentFolderId an identifier of the parent folder.
     * @param ownerId        an identifier of the owner of the file.
     * @param mimeType       a mime type of the file.
     * @param fileSize       a size of the file.
     */
    public FileMetadataRecord(FileId id, FileSystemItemName fileName,
                              FolderId parentFolderId, UserId ownerId,
                              MimeType mimeType, FileSize fileSize) {
        super(id);
        this.fileName = checkNotNull(fileName);
        this.parentFolderId = checkNotNull(parentFolderId);
        this.ownerId = checkNotNull(ownerId);
        this.mimeType = checkNotNull(mimeType);
        this.fileSize = checkNotNull(fileSize);
    }

    /**
     * Getter for the file name.
     *
     * @return file name.
     */
    public FileSystemItemName fileName() {
        return fileName;
    }

    /**
     * Getter for the parent identifier.
     *
     * @return parent identifier.
     */
    public FolderId parentFolderId() {
        return parentFolderId;
    }

    /**
     * Getter for the owner of the file.
     *
     * @return an identifier of the owner of the file.
     */
    public UserId ownerId() {
        return ownerId;
    }

    /**
     * Getter for the file mime type.
     *
     * @return mime type.
     */
    public MimeType mimeType() {
        return mimeType;
    }

    /**
     * Getter for the size of the file.
     *
     * @return file size.
     */
    public FileSize fileSize() {
        return fileSize;
    }

    /**
     * Compares files by identifiers.
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FileMetadataRecord that = (FileMetadataRecord) o;
        return this.id().equals(that.id());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return Objects.hash(id());
    }
}
