package io.javaclasses.filehub.api.user;

import com.google.common.base.Preconditions;
import io.javaclasses.filehub.api.Command;

import java.util.LinkedList;
import java.util.List;

/**
 * Command that stores login and password for registration.
 */
public class RegisterUser implements Command {
    /**
     * Regular expression for password credential.
     */
    public static final String PASSWORD_REGEXP = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[0-9a-zA-Z]{8,}$";
    /**
     * Regular expression for login credential.
     */
    public static final String LOGIN_REGEXP = "^([a-zA-Z0-9]){4,}$";
    /**
     * User login.
     */
    private final String login;
    /**
     * User password.
     */
    private final String password;

    /**
     * Creates new {@link RegisterUser} instance.
     *
     * @param login    user login.
     * @param password user password.
     */
    public RegisterUser(String login, String password) throws CredentialValidationException {
        Preconditions.checkNotNull(login);
        Preconditions.checkNotNull(password);
        List<FailedCredential> errors = new LinkedList<>();
        if (!login.matches(LOGIN_REGEXP)) {
            errors.add(new FailedCredential("login",
                    "Login should not be null and " +
                            "should have uppercase or lowercase letters and digits, min length is 4 chars."));
        }
        if (!password.matches(PASSWORD_REGEXP)) {
            errors.add(new FailedCredential("password",
                    "Password should not be null and should have at least one uppercase and" +
                            " lowercase letter and digit, min length is 8 chars."));
        }
        if (errors.size() != 0) {
            throw new CredentialValidationException(errors.toArray(new FailedCredential[0]));
        }
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
