package io.javaclasses.filehub.storage;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Represents unique identifier for {@link Record}.
 */
public abstract class RecordId {
    /**
     * Id value.
     */
    private final String value;

    /**
     * Creates new {@link RecordId} instance.
     *
     * @param value record id.
     */
    protected RecordId(String value) {
        this.value = checkNotNull(value);
    }

    /**
     * Used for getting of id value.
     *
     * @return user id.
     */
    public String value() {
        return value;
    }

    /**
     * Compares two ids.
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecordId id1 = (RecordId) o;
        return Objects.equals(value, id1.value);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

    /**
     * Represents id in string.
     * {@inheritDoc}
     */
    @Override
    public String toString() {
        return value;
    }
}
