package io.javaclasses.filehub.storage;

import java.util.HashMap;

/**
 * Implementation of {@link Storage} in JVM memory.
 * <p>Saving is based on {@link HashMap}</p>
 *
 * @param <I> record id.
 * @param <R> record type.
 */
public abstract class InMemoryStorage<I extends RecordId, R extends Record<I>>
        implements Storage<RecordId, Record<RecordId>> {
}
