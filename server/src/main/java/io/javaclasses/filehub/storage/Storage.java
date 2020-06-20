package io.javaclasses.filehub.storage;

/**
 * Abstract representation of storage.
 *
 * @param <I> record id.
 * @param <R> record type.
 */
public interface Storage<I extends Id, R extends Record<I>> {

}
