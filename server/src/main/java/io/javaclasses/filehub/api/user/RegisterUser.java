package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.Command;

import java.util.Objects;

/**
 * Value object for login and password.
 */
public class RegisterUser implements Command {
    /**
     * User login.
     */
    private String login;
    /**
     * User password.
     */
    private String password;

    /**
     * Creates new {@link RegisterUser} instance.
     *
     * @param login    user login.
     * @param password user password.
     */
    public RegisterUser(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public String login() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String password() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Compares user credentials.
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RegisterUser that = (RegisterUser) o;
        return Objects.equals(login, that.login) &&
                Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(login, password);
    }
}
