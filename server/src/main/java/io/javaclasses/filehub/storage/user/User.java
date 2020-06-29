package io.javaclasses.filehub.storage.user;

import com.google.errorprone.annotations.Immutable;
import com.google.gson.annotations.SerializedName;
import io.javaclasses.filehub.storage.Record;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Subject that uses FileHub application.
 * <p>Saved in {@link UserStorage}.</p>
 */
@Immutable
public final class User extends Record<UserId> {
    /**
     * User name.
     */
    @SerializedName("name")
    private final Login login;
    /**
     * User hashed password.
     */
    private final String hashedPassword;

    /**
     * Creates new {@link User} instance.
     *
     * @param id       user`s id.
     * @param login    user name.
     * @param hashedPassword user`s password.
     */
    public User(UserId id, Login login, String hashedPassword) {
        super(id);
        this.login = checkNotNull(login);
        this.hashedPassword = checkNotNull(hashedPassword);
    }

    /**
     * Used for getting of user name.
     *
     * @return user id.
     */
    public Login login() {
        return login;
    }


    /**
     * Returns user credentials that are used for authentication.
     *
     * @return user credentials.
     */
    public String password() {
        return hashedPassword;
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
        return this.id().equals(user.id());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return Objects.hash(this.id());
    }
}
