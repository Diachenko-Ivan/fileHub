package io.javaclasses.filehub.api.item;

import java.io.FileNotFoundException;

/**
 * Used for item removing;
 */
public interface RemoveItemProcess {
    /**
     * Removes item depending on its id.
     *
     * @param itemId id of removing item.
     * @throws FileNotFoundException if item with id that is equal to {@code itemId} is not found.
     */
    void remove(String itemId) throws FileNotFoundException;
}
