package io.javaclasses.filehub.storage;

/**
 * Abstract base that represents application storage.
 * <p>Executes CRUD operations with specific {@link Record}.</p>
 *
 * @param <I> record id.
 * @param <R> record type.
 */
public interface Storage<I extends RecordId, R extends Record<I>> {

}
