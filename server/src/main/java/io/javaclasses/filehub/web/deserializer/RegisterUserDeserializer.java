package io.javaclasses.filehub.web.deserializer;

import com.google.gson.*;
import io.javaclasses.filehub.api.user.CredentialsAreNotValidException;
import io.javaclasses.filehub.api.user.RegisterUser;
import io.javaclasses.filehub.storage.user.Login;
import io.javaclasses.filehub.storage.user.Password;

import java.lang.reflect.Type;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Used for deserialization JSON to a {@link RegisterUser} instance.
 */
public class RegisterUserDeserializer implements JsonDeserializer<RegisterUser> {
    /**
     * {@inheritDoc}
     */
    @Override
    public RegisterUser deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
            throws CredentialsAreNotValidException {
        JsonObject object = json.getAsJsonObject();

        String loginValue = object.getAsJsonPrimitive("login").getAsString();
        String passwordValue = object.getAsJsonPrimitive("password").getAsString();

        return new RegisterUser(new Login(loginValue), new Password(passwordValue));
    }

    /**
     * Deserializes json string to {@link RegisterUser} instance.
     *
     * @param json json for deserialization to {@link RegisterUser}.
     * @return {@link RegisterUser} deserialize instance.
     */
    public RegisterUser deserialize(String json) {
        checkNotNull(json);
        Gson gson = new GsonBuilder()
                .registerTypeAdapter(RegisterUser.class, this)
                .create();
        return gson.fromJson(json, RegisterUser.class);
    }
}
