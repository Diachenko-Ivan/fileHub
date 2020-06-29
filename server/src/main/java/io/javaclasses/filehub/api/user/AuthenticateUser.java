package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.Command;
import io.javaclasses.filehub.storage.user.Login;
import io.javaclasses.filehub.storage.user.Password;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Command to authenticate user in the application.
 * <p>Stores user login and password.
 */
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
