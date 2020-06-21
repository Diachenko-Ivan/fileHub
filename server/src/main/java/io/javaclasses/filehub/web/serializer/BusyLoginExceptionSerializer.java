package io.javaclasses.filehub.web.serializer;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javaclasses.filehub.api.user.BusyLoginException;

/**
 * Used for serialization to JSON of {@link BusyLoginException}.
 */
public class BusyLoginExceptionSerializer {
    /**
     * Object that executes a serialization.
     */
    private final Gson gson = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .create();

    /**
     * Serializes {@link BusyLoginException} to JSON.
     *
     * @param exception {@link BusyLoginException} instance.
     * @return JSON string.
     */
    public String serialize(BusyLoginException exception) {
        Preconditions.checkNotNull(exception);
        return gson.toJson(exception);
    }
}
