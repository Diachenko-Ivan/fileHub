package io.javaclasses.filehub.web.user;

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

    public String id() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String name() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserCredentials credentials() {
        return credentials;
    }

    public void setCredentials(UserCredentials credentials) {
        this.credentials = credentials;
    }

    public String token() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
