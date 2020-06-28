package io.javaclasses.filehub.storage;

/**
 * An abstract base that represents persistent storage in the FileHub application.
 * <p>Provides CRUD operations with specific {@link Record}.</p>
 *
 * @param <I> record id.
 * @param <R> record type.
 */
public interface Storage<I extends RecordId, R extends Record<I>> {

}
