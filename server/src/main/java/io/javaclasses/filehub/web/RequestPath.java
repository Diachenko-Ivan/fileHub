package io.javaclasses.filehub.web;

/**
 * Container of request paths.
 */
public enum RequestPath {
    /**
     * Request path for registration.
     */
    REGISTRATION("/api/register");
    /**
     * Url path.
     */
    private final String value;

    /**
     * Creates new {@link RequestPath}.
     *
     * @param value url path.
     */
    RequestPath(String value) {
        this.value = value;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString() {
        return this.value;
    }
}
