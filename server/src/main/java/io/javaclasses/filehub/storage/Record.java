package io.javaclasses.filehub.storage;

import com.google.common.base.Preconditions;

/**
 * Represents anything that can be stored in memory.
 *
 * @param <I> record id type.
 */
public abstract class Record<I extends Id> {
    /**
     * Id value.
     */
    protected I id;

    /**
     * Creates new {@link Record} instance.
     *
     * @param id id value.
     */
    public Record(I id) {
        Preconditions.checkNotNull(id);
        this.id = id;
    }

    /**
     * Returns record id.
     *
     * @return record id.
     */
    public I id() {
        return id;
    }
}
