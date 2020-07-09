package io.javaclasses.filehub.storage.item.file;

import com.google.errorprone.annotations.Immutable;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The value object for the mime type of {@link FileMetadataRecord}.
 */
@Immutable
public final class MimeType {

    /**
     * The mime type value.
     */
    private final String value;

    /**
     * Creates a new MimeType.
     *
     * @param value the mime type value.
     */
    public MimeType(String value) {
        this.value = checkNotNull(value);
    }

    /**
     * Getter for mime type value.
     *
     * @return mime type value.
     */
    public String value() {
        return value;
    }

    @Override
    public String toString() {
        return "MimeType {" + value + "}";
    }
}
