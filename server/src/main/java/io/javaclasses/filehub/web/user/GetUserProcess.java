package io.javaclasses.filehub.web.user;

/**
 * Used for getting of user.
 */
public interface GetUserProcess {
    /**
     * Returns user according to token.
     * <p>If token is expired then method returns <i>null</i>.
     *
     * @param token user authorization token.
     * @return authorized user.
     */
    User user(String token);
}
