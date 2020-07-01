package io.javaclasses.filehub.storage.user;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.user.CredentialsAreNotValidException;
import io.javaclasses.filehub.api.user.NotValidCredential;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Value object that represents login credential.
 */
@Immutable
public final class Login {
    /**
     * Regular expression for login credential.
     */
    private static final String LOGIN_REGEXP = "^([a-zA-Z0-9]){4,}$";
    /**
     * Login value.
     */
    private final String value;

    /**
     * Creates new {@link Login} instance with {@code value} validation beforehand.
     *
     * @param value login.
     * @throws CredentialsAreNotValidException if {@code value} does not match to regular expression.
     */
    public Login(String value) throws CredentialsAreNotValidException {
        checkNotNull(value);
        if (!value.matches(LOGIN_REGEXP)) {
            throw new CredentialsAreNotValidException(
                    new NotValidCredential[]{new NotValidCredential("login",
                            "Login should not be null and " +
                                    "should have uppercase or lowercase letters and digits, min length is 4 chars.")});
        }
        this.value = value;
    }

    /**
     * Returns string login value.
     *
     * @return login.
     */
    public String value() {
        return value;
    }

    /**
     * Compares logins by their values.
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Login login = (Login) o;
        return Objects.equals(value, login.value);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
