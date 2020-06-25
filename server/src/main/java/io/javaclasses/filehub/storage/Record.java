package io.javaclasses.filehub.storage;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Data structure that can be saved in {@link Storage}.
 *
 * @param <I> record id type.
 */
public abstract class Record<I extends RecordId> {
    /**
     * Id value.
     */
    private final I id;

    /**
     * Creates new {@link Record} instance.
     *
     * @param id id value.
     */
    protected Record(I id) {
        this.id = checkNotNull(id);
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
