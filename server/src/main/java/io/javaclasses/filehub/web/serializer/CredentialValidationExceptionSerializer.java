package io.javaclasses.filehub.web.serializer;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javaclasses.filehub.api.user.CredentialValidationException;

/**
 * Used for serialization to JSON of {@link CredentialValidationException}.
 */
public class CredentialValidationExceptionSerializer {
    /**
     * Object that executes a serialization.
     */
    private final Gson gson = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .create();

    /**
     * Serializes {@link CredentialValidationException} to JSON.
     *
     * @param exception {@link CredentialValidationException} instance.
     * @return JSON string.
     */
    public String serialize(CredentialValidationException exception) {
        Preconditions.checkNotNull(exception);
        return gson.toJson(exception);
    }
}
