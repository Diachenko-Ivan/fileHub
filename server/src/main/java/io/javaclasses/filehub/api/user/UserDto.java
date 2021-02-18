package io.javaclasses.filehub.api.user;

import com.google.gson.annotations.SerializedName;
import io.javaclasses.filehub.storage.user.User;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The value object that contains information about {@link io.javaclasses.filehub.storage.user.User}.
 * <p>Used for serialization into JSON.
 */
public class UserDto {
    /**
     * An identifier of the user.
     */
    @SerializedName("id")
    private String id;
    /**
     * The name of the user.
     */
    @SerializedName("name")
    private String name;

    /**
     * Creates new UserDto instance retrieving data from {@code user}.
     *
     * @param user object to retrieve information from.
     */
    public UserDto(User user) {
        checkNotNull(user);
        this.id = user.id().value();
        this.name = user.login().value();
    }
}
