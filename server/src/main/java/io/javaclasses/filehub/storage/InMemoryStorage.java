package io.javaclasses.filehub.storage;

import java.util.HashMap;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;
import static java.util.Optional.of;

/**
 * Implementation of {@link Storage} in JVM memory.
 * <p>Uses {@link HashMap} for storing of {@link Record}</p>
 *
 * @param <I> record identifier.
 * @param <R> record type.
 */
public abstract class InMemoryStorage<I extends RecordId, R extends Record<I>>
        implements Storage<I, R> {
    /**
     * Storage for records {@link Record} where key is {@link RecordId} and value is corresponding instance.
     */
    private final HashMap<I, R> records = new HashMap<>();

    /**
     * Adds new {@link Record} to the storage.
     *
     * @param record added user.
     * @throws IllegalArgumentException if record with {@code record.id()} already exists in the storage.
     */
    public synchronized void add(R record) {
        checkNotNull(record);
        if (records.putIfAbsent(record.id(), record) != null) {
            throw new IllegalArgumentException(record.getClass().getSimpleName() + " with such id is already exists.");
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<R> find(I id) {
        return of(records.get(id));
    }

    /**
     * @return map of records.
     */
    public HashMap<I, R> records() {
        return records;
    }
}
