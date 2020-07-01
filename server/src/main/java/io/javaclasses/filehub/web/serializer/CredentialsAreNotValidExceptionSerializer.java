package io.javaclasses.filehub.web.serializer;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javaclasses.filehub.api.user.CredentialsAreNotValidException;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Used for serialization to JSON of {@link CredentialsAreNotValidException}.
 */
public class CredentialsAreNotValidExceptionSerializer {
    /**
     * Object that executes a serialization.
     */
    private final Gson gson = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .create();

    /**
     * Serializes {@link CredentialsAreNotValidException} to JSON.
     *
     * @param exception {@link CredentialsAreNotValidException} instance.
     * @return JSON string.
     */
    public String serialize(CredentialsAreNotValidException exception) {
        checkNotNull(exception);
        return gson.toJson(exception);
    }
}
