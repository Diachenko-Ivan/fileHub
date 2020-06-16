package io.javaclasses.filehub.api.user;

/**
 * Represents user access token.
 */
public class TokenDto {
    /**
     * Contains token value.
     */
    private String token;

    /**
     * Creates new {@link TokenDto} instance.
     *
     * @param token token value
     */
    public TokenDto(String token) {
        this.token = token;
    }

    /**
     * Returns user`s token.
     *
     * @return token value.
     */
    public String token() {
        return token;
    }

    /**
     * Sets new token for user.
     *
     * @param token token value.
     */
    public void setToken(String token) {
        this.token = token;
    }
}
