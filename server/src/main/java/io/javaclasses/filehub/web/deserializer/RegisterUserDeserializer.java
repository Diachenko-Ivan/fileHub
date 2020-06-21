package io.javaclasses.filehub.web.deserializer;

import com.google.common.base.Preconditions;
import com.google.gson.*;
import io.javaclasses.filehub.api.user.CredentialValidationException;
import io.javaclasses.filehub.api.user.RegisterUser;

import java.lang.reflect.Type;

/**
 * Used for deserialization JSON to a {@link RegisterUser} instance.
 */
public class RegisterUserDeserializer implements JsonDeserializer<RegisterUser> {
    /**
     * {@inheritDoc}
     */
    @Override
    public RegisterUser deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
            throws CredentialValidationException {
        JsonObject object = json.getAsJsonObject();

        String login = object.getAsJsonPrimitive("login").getAsString();
        String password = object.getAsJsonPrimitive("password").getAsString();

        return new RegisterUser(login, password);
    }

    /**
     * Deserializes json string to {@link RegisterUser} instance.
     *
     * @param json json for deserialization to {@link RegisterUser}.
     * @return {@link RegisterUser} deserialize instance.
     */
    public RegisterUser deserialize(String json) {
        Preconditions.checkNotNull(json);
        Gson gson = new GsonBuilder()
                .registerTypeAdapter(RegisterUser.class, this)
                .create();
        return gson.fromJson(json, RegisterUser.class);
    }
}
