package io.javaclasses.filehub.web.user;

/**
 * Used for getting of user.
 */
public interface GetUserService {
    /**
     * Returns user according to token.
     *
     * @param token user authorization token.
     * @return authorized user.
     * @throws AuthorizationException if token is already expired.
     */
    User user(String token) throws AuthorizationException;
}
