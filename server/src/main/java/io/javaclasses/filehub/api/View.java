package io.javaclasses.filehub.api;

/**
 * An abstract base that processes {@link Query} from the client.
 *
 * @param <Q> type of query.
 * @param <R> result of the query processing.
 */
public interface View<Q extends Query, R> {

    /**
     * Processes {@code query} and returns the result of processing.
     *
     * @param query client query.
     * @return result of processing.
     */
    R process(Q query);
}
