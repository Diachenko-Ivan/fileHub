package io.javaclasses.filehub.api.user;

/**
 * Used for user authentication.
 */
public interface AuthenticationUserService {
    /**
     * Authenticates existent user.
     *
     * @param registerUser login and password.
     * @throws AuthenticationException if user with these credentials is not found.
     */
    TokenDto logIn(RegisterUser registerUser) throws AuthenticationException;
}
