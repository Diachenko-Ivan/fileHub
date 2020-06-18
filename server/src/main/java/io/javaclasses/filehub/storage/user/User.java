package io.javaclasses.filehub.storage.user;

import com.google.gson.annotations.Expose;

import java.util.Objects;

/**
 * Represent client.
 */
public class User {
    /**
     * User`s id.
     */
    private String id;
    /**
     * User name.
     */
    private String name;
    /**
     * User`s application access token.
     */
    @Expose(serialize = false, deserialize = false)
    private String token;
    /**
     * User`s credentials.
     */
    @Expose(serialize = false, deserialize = false)
    private UserCredentials credentials;

    /**
     * Creates new {@link User} instance.
     *
     * @param id          user`s id
     * @param name        username
     * @param credentials user`s credentials.
     */
    public User(String id, String name, UserCredentials credentials) {
        this.id = id;
        this.name = name;
        this.credentials = credentials;
    }

    /**
     * Used for getting of user id.
     *
     * @return user id.
     */
    public String id() {
        return id;
    }

    /**
     * Sets user new id.
     *
     * @param id user new id.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Used for getting of user name.
     *
     * @return user id.
     */
    public String name() {
        return name;
    }

    /**
     * Sets user new name.
     *
     * @param name user new name.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Returns user credentials that are used for authentication.
     *
     * @return user credentials.
     */
    public UserCredentials credentials() {
        return credentials;
    }

    /**
     * Sets user new credentials.
     *
     * @param credentials user credentials.
     */
    public void setCredentials(UserCredentials credentials) {
        this.credentials = credentials;
    }

    /**
     * Returns user authentication token.
     *
     * @return user token.
     */
    public String token() {
        return token;
    }

    /**
     * Sets user new authentication token.
     *
     * @param token user token.
     */
    public void setToken(String token) {
        this.token = token;
    }

    /**
     * Compares users their ids.
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
