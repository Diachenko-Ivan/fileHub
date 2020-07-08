package io.javaclasses.filehub.storage.item.file;

/**
 * The enumeration of all possible mime-types of {@link FileMetadataRecord}.
 */
public enum MimeType {

    IMAGE("image"),
    AUDIO("audio"),
    VIDEO("video"),
    TEXT("text"),
    UNKNOWN("unknown");

    /**
     * The mime type value.
     */
    private final String value;

    /**
     * Creates a new MimeType.
     *
     * @param value the mime type value.
     */
    MimeType(String value) {
        this.value = value;
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
