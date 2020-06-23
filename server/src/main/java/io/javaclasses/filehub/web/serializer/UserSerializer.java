package io.javaclasses.filehub.web.serializer;

import com.google.gson.Gson;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserDto;

/**
 * Serializer to JSON for {@link User} record.
 */
public class UserSerializer {

    private final Gson gson = new Gson();

    public String serialize(UserDto userToSerialize) {
        return gson.toJson(userToSerialize);
    }
}
