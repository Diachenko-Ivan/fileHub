package io.javaclasses.filehub.web.user;

/**
 * Used for user authentication.
 */
public interface AuthenticationUserService {
    /**
     * Authenticates existent user.
     *
     * @param userCredentials login and password.
     * @throws AuthenticationException if user with these credentials is not found.
     */
    TokenDto logIn(UserCredentials userCredentials) throws AuthenticationException;
}
