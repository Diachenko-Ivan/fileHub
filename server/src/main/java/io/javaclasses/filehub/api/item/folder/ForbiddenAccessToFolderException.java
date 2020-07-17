package io.javaclasses.filehub.api.item.folder;

import io.javaclasses.filehub.storage.user.User;

/**
 * The exception that is thrown when {@link User} tries to get access to a folder that does not belong to him.
 */
public class ForbiddenAccessToFolderException extends RuntimeException {
    /**
     * Creates new ForbiddenAccessToFolderException instance.
     *
     * @param message provided error message.
     */
    public ForbiddenAccessToFolderException(String message) {
        super(message);
    }
}
