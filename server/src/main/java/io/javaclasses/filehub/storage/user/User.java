package io.javaclasses.filehub.storage.user;

import com.google.gson.annotations.SerializedName;
import io.javaclasses.filehub.storage.Record;

import java.util.Objects;

/**
 * Represents client.
 */
public class User extends Record<UserId> {
    /**
     * User name.
     */
    @SerializedName("name")
    private String login;
    /**
     * User`s password.
     */
    private String password;

    /**
     * Creates new {@link User} instance.
     *
     * @param id       user`s id
     * @param login    username
     * @param password user`s password.
     */
    public User(UserId id, String login, String password) {
        super(id);
        this.login = login;
        this.password = password;
    }

    /**
     * Used for getting of user name.
     *
     * @return user id.
     */
    public String login() {
        return login;
    }

    /**
     * Sets user new name.
     *
     * @param login user new name.
     */
    public void setLogin(String login) {
        this.login = login;
    }

    /**
     * Returns user credentials that are used for authentication.
     *
     * @return user credentials.
     */
    public String password() {
        return password;
    }

    /**
     * Sets user new credentials.
     *
     * @param password user credentials.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Compares users by their ids.
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
