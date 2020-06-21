package io.javaclasses.filehub.api.user;

import com.google.common.base.Preconditions;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Represents error for user credential.
 * <p>Used for serialization.
 */
public class FailedCredential {
    /**
     * Name of field with error.
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
     * Creates new {@link FailedCredential}
     *
     * @param fieldName field name.
     * @param message   error message.
     */
    public FailedCredential(String fieldName, String message) {
        Preconditions.checkNotNull(fieldName);
        Preconditions.checkNotNull(message);
        this.fieldName = fieldName;
        this.errorMessage = message;
    }

    /**
     * Returns string representation of {@link FailedCredential} instance.
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
