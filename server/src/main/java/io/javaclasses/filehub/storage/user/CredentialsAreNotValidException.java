package io.javaclasses.filehub.storage.user;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import io.javaclasses.filehub.api.user.DataValidationError;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Exception that is thrown when client credentials({@link Login} or {@link Password}) are invalid.
 */
public class CredentialsAreNotValidException extends RuntimeException {
    /**
     * Array of non validated credentials {@link DataValidationError}.
     */
    @Expose
    @SerializedName("errors")
    private final DataValidationError[] dataValidationErrors;

    /**
     * Creates new {@link CredentialsAreNotValidException} instance.
     *
     * @param dataValidationErrors array of failed credentials.
     */
    public CredentialsAreNotValidException(DataValidationError[] dataValidationErrors) {
        this.dataValidationErrors = checkNotNull(dataValidationErrors);
    }

    /**
     * Returns array of failed credentials.
     *
     * @return array of {@link DataValidationError}.
     */
    public DataValidationError[] failedCredentials() {
        return dataValidationErrors;
    }
}
