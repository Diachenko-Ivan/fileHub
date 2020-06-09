package io.javaclasses.filehub.web.user;

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

    public String token() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
