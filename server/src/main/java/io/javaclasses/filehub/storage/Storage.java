package io.javaclasses.filehub.storage;

import java.util.Optional;

/**
 * An abstract base that represents persistent storage in the FileHub application.
 * <p>Provides CRUD operations with specific {@link Record}.</p>
 *
 * @param <I> record id.
 * @param <R> record type.
 */
public interface Storage<I extends RecordId, R extends Record<I>> {

    /**
     * Returns record {@link Record} by its identifier {@link RecordId}.
     *
     * @param id record identifier.
     * @return record with the same identifier wrapped in {@link Optional}.
     */
    Optional<R> find(I id);
}
