package io.javaclasses.filehub.storage;

import java.util.Objects;

/**
 * Represents id for {@link Record}.
 */
public abstract class Id {
    /**
     * Id value.
     */
    protected String value;

    /**
     * Creates new {@link Id} instance.
     *
     * @param value record id.
     */
    public Id(String value) {
        this.value = value;
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
        Id id1 = (Id) o;
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
