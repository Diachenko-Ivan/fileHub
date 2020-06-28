package io.javaclasses.filehub.api;

import java.util.UUID;

import static java.util.UUID.randomUUID;

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
        return randomUUID().toString();
    }
}
