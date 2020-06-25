package io.javaclasses.filehub.storage;

import java.util.HashMap;

/**
 * Implementation of {@link Storage} in JVM memory.
 * <p>Saving is based on {@link HashMap}</p>
 *
 * @param <I> record {@link Record} id.
 * @param <R> record {@link Record} type.
 */
public abstract class InMemoryStorage<I extends RecordId, R extends Record<I>>
        implements Storage<RecordId, Record<RecordId>> {
}
