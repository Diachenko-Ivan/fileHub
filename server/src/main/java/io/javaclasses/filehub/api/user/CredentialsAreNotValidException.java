package io.javaclasses.filehub.api.user;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import io.javaclasses.filehub.storage.user.Login;
import io.javaclasses.filehub.storage.user.Password;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Exception that is thrown when client credentials({@link Login} or {@link Password}) are not successfully validated.
 */
public class CredentialsAreNotValidException extends RuntimeException {
    /**
     * Array of non validated credentials {@link NotValidCredential}.
     */
    @Expose
    @SerializedName("errors")
    private final NotValidCredential[] notValidCredentials;

    /**
     * Creates new {@link CredentialsAreNotValidException} instance.
     *
     * @param notValidCredentials array of failed credentials.
     */
    public CredentialsAreNotValidException(NotValidCredential[] notValidCredentials) {
        this.notValidCredentials = checkNotNull(notValidCredentials);
    }

    /**
     * Returns array of failed credentials.
     *
     * @return array of {@link NotValidCredential}.
     */
    public NotValidCredential[] failedCredentials() {
        return notValidCredentials;
    }
}
