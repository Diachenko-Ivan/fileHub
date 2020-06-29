package io.javaclasses.filehub.api.user;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.Command;
import io.javaclasses.filehub.storage.user.Login;
import io.javaclasses.filehub.storage.user.Password;
import io.javaclasses.filehub.storage.user.User;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Command to register user {@link User} in FileHub application.
 * <p>Contains {@link User} login {@link Login} and password {@link Password}.</p>
 */
@Immutable
public final class RegisterUser implements Command {
    /**
     * User login for registration.
     */
    private final Login login;
    /**
     * User password for registration.
     */
    private final Password password;

    /**
     * Creates new {@link RegisterUser} instance.
     *
     * @param login    user login.
     * @param password user password.
     */
    public RegisterUser(Login login, Password password) {
        this.login = checkNotNull(login);
        this.password = checkNotNull(password);
    }

    /**
     * Returns login credential.
     *
     * @return login value.
     */
    public Login login() {
        return login;
    }

    /**
     * Returns password credential.
     *
     * @return password value.
     */
    public Password password() {
        return password;
    }
}
