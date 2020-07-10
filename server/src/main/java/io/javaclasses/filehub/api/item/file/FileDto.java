package io.javaclasses.filehub.api.item.file;

import com.google.errorprone.annotations.Immutable;
import com.google.gson.annotations.SerializedName;
import io.javaclasses.filehub.storage.item.file.FileMetadataRecord;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A value object that contains information about file {@link FileMetadataRecord}.
 * <p>Used for serialization into JSON.</p>
 */
@Immutable
public final class FileDto {
    /**
     * An identifier of the file.
     */
    @SerializedName("id")
    private final String id;
    /**
     * A name of the file.
     */
    @SerializedName("name")
    private final String fileName;
    /**
     * File size.
     */
    @SerializedName("size")
    private final long size;
    /**
     * A type of content in the file.
     */
    @SerializedName("mimeType")
    private final String mimeType;

    /**
     * * Creates new {@link FileDto} instance retrieving data from {@code fileMetadata}.
     *
     * @param fileMetadata file record on the basis of which a folder DTO is created.
     */
    public FileDto(FileMetadataRecord fileMetadata) {
        checkNotNull(fileMetadata);
        this.id = fileMetadata.id().value();
        this.fileName = fileMetadata.fileName().value();
        this.size = fileMetadata.fileSize().value();
        this.mimeType = fileMetadata.mimeType().value();
    }

    /**
     * Getter for an identifier of the file.
     *
     * @return an identifier of the file.
     */
    public String id() {
        return id;
    }

    /**
     * Getter for a name of the file.
     *
     * @return file name.
     */
    public String fileName() {
        return fileName;
    }

    /**
     * Getter for a size of the file.
     *
     * @return file size.
     */
    public long size() {
        return size;
    }

    /**
     * Getter for a type of content of the file.
     *
     * @return file mime type.
     */
    public String mimeType() {
        return mimeType;
    }
}
