package io.javaclasses.filehub.api.user;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Exception that is used for case when new user is being registered with login which already exists.
 */
public class LoginIsTakenException extends RuntimeException {
    /**
     * Contains one {@link NotValidCredential} for login field.
     */
    @SerializedName("errors")
    @Expose
    private final NotValidCredential[] errors = new NotValidCredential[1];

    /**
     * Creates new {@link LoginIsTakenException} instance.
     *
     * @param message error message.
     */
    public LoginIsTakenException(String message) {
        super(message);
        errors[0] = new NotValidCredential("login", message);
    }
}
