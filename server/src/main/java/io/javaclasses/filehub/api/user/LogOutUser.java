package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.Command;
import io.javaclasses.filehub.storage.user.TokenId;
import io.javaclasses.filehub.storage.user.TokenRecord;
import io.javaclasses.filehub.storage.user.User;
import jdk.nashorn.internal.ir.annotations.Immutable;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Client intention to exit from the application.
 * <p>Contains the token identifier {@link TokenId} by which {@link User} will be logged out.</p>
 */
@Immutable
public final class LogOutUser implements Command {
    /**
     * {@link TokenRecord} identifier.
     */
    private final TokenId tokenId;

    /**
     * Creates new {@link LogOutUser} command.
     *
     * @param tokenId user`s {@link User} access token identifier.
     */
    public LogOutUser(TokenId tokenId) {
        this.tokenId = checkNotNull(tokenId);
    }

    /**
     * Getter for access token identifier {@link TokenId}.
     *
     * @return token identifier value.
     */
    public TokenId tokenId() {
        return tokenId;
    }
}
