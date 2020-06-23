package io.javaclasses.filehub.web.serializer;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javaclasses.filehub.storage.user.TokenRecord;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * JSON serializer for {@link TokenRecord}.
 */
public class TokenSerializer {
    /**
     * Object that executes a serialization.
     */
    private final Gson gson = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .create();

    /**
     * Serializes {@link TokenRecord} to JSON.
     *
     * @param token {@link TokenRecord} instance.
     * @return JSON string.
     */
    public String serialize(TokenRecord token) {
        checkNotNull(token);
        return gson.toJson(token);
    }
}
