package io.javaclasses.filehub.api.user;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Used for case when new user is being registered with login which already exists.
 */
public class BusyLoginException extends RuntimeException {
    /**
     * Contains one {@link FailedCredential} for login field.
     */
    @SerializedName("errors")
    @Expose
    private final FailedCredential[] errors = new FailedCredential[1];

    /**
     * Creates new {@link BusyLoginException} instance.
     *
     * @param message - error message.
     */
    public BusyLoginException(String message) {
        super(message);
        errors[0] = new FailedCredential("login", message);
    }
}
