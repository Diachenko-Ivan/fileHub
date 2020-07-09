package io.javaclasses.filehub.storage.item.file;

import io.javaclasses.filehub.storage.Record;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.user.UserId;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A data structure that contains information about file.
 */
public final class FileMetadataRecord extends Record<FileId> {
    /**
     * The name of file.
     */
    private final FileSystemItemName fileName;
    /**
     * An identifier of the parent folder {@link io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord}.
     */
    private final FolderId parentFolderId;
    /**
     * An identifier for the file owner
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

    public FileSize fileSize() {
        return fileSize;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FileMetadataRecord that = (FileMetadataRecord) o;
        return this.id().equals(that.id());
    }

    @Override
    public int hashCode() {
        return Objects.hash(fileName, parentFolderId, ownerId, mimeType, fileSize);
    }
}
