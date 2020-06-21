package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.Command;

/**
 * Command that is used for authentication and stores user login and password.
 */
public class AuthenticateUser implements Command {
    /**
     * User login.
     */
    private final String login;
    /**
     * User password.
     */
    private final String password;

    /**
     * Creates new {@link AuthenticateUser} instance.
     *
     * @param login    user login.
     * @param password user password.
     */
    public AuthenticateUser(String login, String password) {
        this.login = login;
        this.password = password;
    }

    /**
     * Returns login credential value.
     *
     * @return login value.
     */
    public String login() {
        return login;
    }

    /**
     * Returns password credential value.
     *
     * @return password value.
     */
    public String password() {
        return password;
    }
}
