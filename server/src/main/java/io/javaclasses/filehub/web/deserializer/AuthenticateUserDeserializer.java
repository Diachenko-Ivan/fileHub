package io.javaclasses.filehub.web.deserializer;

import com.google.common.base.Preconditions;
import com.google.gson.*;
import io.javaclasses.filehub.api.user.AuthenticateUser;
import io.javaclasses.filehub.api.user.RegisterUser;

import java.lang.reflect.Type;

/**
 * JSON deserializer for {@link AuthenticateUser} command.
 */
public class AuthenticateUserDeserializer implements JsonDeserializer<AuthenticateUser> {

    /**
     * Returns {@link AuthenticateUser} command deserialized from JSON.
     * {@inheritDoc}
     */
    @Override
    public AuthenticateUser deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
            throws JsonParseException {
        JsonObject object = json.getAsJsonObject();

        String login = object.getAsJsonPrimitive("login").getAsString();
        String password = object.getAsJsonPrimitive("password").getAsString();

        return new AuthenticateUser(login, password);
    }

    /**
     * Returns deserialized {@link AuthenticateUser} instance from JSON.
     *
     * @param json json string that is being deserialized from JSON.
     * @return deserialized instance.
     */
    public AuthenticateUser deserialize(String json) {
        Preconditions.checkNotNull(json);
        Gson gson = new GsonBuilder()
                .registerTypeAdapter(RegisterUser.class, this)
                .create();
        return gson.fromJson(json, AuthenticateUser.class);
    }
}
