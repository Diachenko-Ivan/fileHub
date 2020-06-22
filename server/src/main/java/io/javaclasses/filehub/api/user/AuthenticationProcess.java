package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.storage.user.TokenRecord;

/**
 * Used for user authentication.
 */
public interface AuthenticationProcess {
    /**
     * Authenticates existent user.
     *
     * @param authenticateUser login and password.
     * @throws AuthenticationException if user with these credentials {@link AuthenticateUser} is not found.
     */
    TokenRecord logIn(AuthenticateUser authenticateUser) throws AuthenticationException;
}
