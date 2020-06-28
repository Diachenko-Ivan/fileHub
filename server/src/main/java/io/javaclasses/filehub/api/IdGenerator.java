package io.javaclasses.filehub.api;

import java.util.UUID;

/**
 * Generator of the identifier for a record {@link io.javaclasses.filehub.storage.Record}.
 */
public class IdGenerator {

    /**
     * Generates identifier using {@link UUID} functionality.
     *
     * @return generated identifier in string.
     */
    public static synchronized String generateId() {
        return UUID.randomUUID().toString();
    }
}
