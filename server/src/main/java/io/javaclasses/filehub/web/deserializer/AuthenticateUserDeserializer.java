package io.javaclasses.filehub.web.deserializer;

import com.google.gson.*;
import io.javaclasses.filehub.api.user.AuthenticateUser;
import io.javaclasses.filehub.storage.user.Login;
import io.javaclasses.filehub.storage.user.Password;

import java.lang.reflect.Type;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * JSON deserializer for {@link AuthenticateUser} command.
 */
public class AuthenticateUserDeserializer implements JsonDeserializer<AuthenticateUser> {

    /**
     * Returns deserialized from JSON {@link AuthenticateUser} command.
     * {@inheritDoc}
     */
    @Override
    public AuthenticateUser deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
            throws JsonParseException {
        checkNotNull(typeOfT);
        checkNotNull(context);
        checkNotNull(json);
        JsonObject object = json.getAsJsonObject();

        String login = object.getAsJsonPrimitive("login").getAsString();
        String password = object.getAsJsonPrimitive("password").getAsString();

        return new AuthenticateUser(new Login(login), new Password(password));
    }

    /**
     * Returns deserialized {@link AuthenticateUser} instance from JSON.
     *
     * @param json json string that is being deserialized from JSON.
     * @return deserialized instance.
     */
    public AuthenticateUser deserialize(String json) {
        checkNotNull(json);
        Gson gson = new GsonBuilder()
                .registerTypeAdapter(AuthenticateUser.class, this)
                .create();
        return gson.fromJson(json, AuthenticateUser.class);
    }
}
