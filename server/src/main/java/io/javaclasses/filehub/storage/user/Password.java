package io.javaclasses.filehub.storage.user;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.user.CredentialsAreNotValidException;
import io.javaclasses.filehub.api.user.NotValidCredential;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Value object that represents {@link User} password credential.
 */
@Immutable
public final class Password {
    /**
     * Regular expression for password credential.
     */
    public static final String PASSWORD_REGEXP = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[0-9a-zA-Z]{8,}$";
    /**
     * Password value.
     */
    private final String value;

    /**
     * Creates new {@link Password} instance with {@code value} validation beforehand.
     *
     * @param value password.
     * @throws CredentialsAreNotValidException if {@code value} is not valid.
     */
    public Password(String value) throws CredentialsAreNotValidException {
        checkNotNull(value);
        if (!value.matches(PASSWORD_REGEXP)) {
            throw new CredentialsAreNotValidException(
                    new NotValidCredential[]{new NotValidCredential("password",
                            "Password should not be null and should have at least one uppercase and" +
                                    " lowercase letter and digit, min length is 8 chars.")});
        }
        this.value = value;
    }

    public String value() {
        return value;
    }

    /**
     * Compares passwords by their values.
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Password password = (Password) o;
        return Objects.equals(value, password.value);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
