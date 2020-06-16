package io.javaclasses.filehub.api.user;

/**
 * Used for user logout.
 */
public interface LogOutUserService {
    /**
     * Logs out user by its token.
     *
     * @param token user access token.
     * @throws AuthorizationException if user with this token is not found.
     */
    void logOut(String token) throws AuthorizationException;
}
