package io.javaclasses.filehub.api.user;

/**
 * Exception that is used for case when new user is being registered with login which already exists.
 */
public class LoginIsTakenException extends RuntimeException {

    /**
     * Creates new {@link LoginIsTakenException} instance.
     *
     * @param message error message.
     */
    public LoginIsTakenException(String message) {
        super(message);
    }
}
