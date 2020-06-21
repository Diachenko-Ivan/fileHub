package io.javaclasses.filehub.api.user;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Represents error in the result of user credentials validation.
 */
public class CredentialValidationException extends RuntimeException {
    /**
     * Contains {@link FailedCredential} instances.
     */
    @Expose
    @SerializedName("errors")
    private final FailedCredential[] failedCredentials;

    /**
     * Creates new {@link CredentialValidationException} instance.
     *
     * @param failedCredentials - array of failed credentials.
     */
    public CredentialValidationException(FailedCredential[] failedCredentials) {
        this.failedCredentials = failedCredentials;
    }

    /**
     * Returns array of failed credentials.
     *
     * @return array of {@link FailedCredential}.
     */
    public FailedCredential[] failedCredentials() {
        return failedCredentials;
    }
}
