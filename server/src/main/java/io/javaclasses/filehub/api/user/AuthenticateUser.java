package io.javaclasses.filehub.api.user;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.Command;
import io.javaclasses.filehub.storage.user.Login;
import io.javaclasses.filehub.storage.user.Password;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The command {@link Command} to authenticate a user in the FileHub application.
 * <p>Stores user login and password.
 */
@Immutable
public class AuthenticateUser implements Command {
    /**
     * User login.
     */
    private final Login login;
    /**
     * User password.
     */
    private final Password password;

    /**
     * Creates new {@link AuthenticateUser} instance.
     *
     * @param login    user login.
     * @param password user password.
     */
    public AuthenticateUser(Login login, Password password) {
        checkNotNull(login);
        checkNotNull(password);
        this.login = login;
        this.password = password;
    }

    /**
     * Returns login credential value.
     *
     * @return login value.
     */
    public Login login() {
        return login;
    }

    /**
     * Returns password credential value.
     *
     * @return password value.
     */
    public Password password() {
        return password;
    }
}
