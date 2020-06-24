package io.javaclasses.filehub.api.user;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Value object that contains name of credential that failed validation
 * and corresponding error message.
 * <p>Used for serialization.
 */
public class NotValidCredential {
    /**
     * Name of credential.
     */
    @SerializedName("field")
    @Expose
    private final String fieldName;
    /**
     * Detailed error message for field.
     */
    @SerializedName("message")
    @Expose
    private final String errorMessage;

    /**
     * Creates new {@link NotValidCredential} instance.
     *
     * @param fieldName credential name.
     * @param message   error message.
     */
    public NotValidCredential(String fieldName, String message) {
        this.fieldName = checkNotNull(fieldName);
        this.errorMessage = checkNotNull(message);
    }

    /**
     * Returns string representation of {@link NotValidCredential} instance.
     * <p>Used for logging.
     * {@inheritDoc}
     */
    @Override
    public String toString() {
        return "FailedCredential{" +
                "fieldName='" + fieldName + '\'' +
                ", errorMessage='" + errorMessage + '\'' +
                '}';
    }
}
