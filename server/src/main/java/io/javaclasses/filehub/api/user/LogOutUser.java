package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.Command;
import io.javaclasses.filehub.storage.user.LoggedInUserRecord;
import io.javaclasses.filehub.storage.user.Token;
import io.javaclasses.filehub.storage.user.User;
import jdk.nashorn.internal.ir.annotations.Immutable;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * An intention of the client to log out from the application.
 * <p>Contains the token identifier {@link Token} by which {@link User} is logged out.</p>
 */
@Immutable
public final class LogOutUser implements Command {
    /**
     * {@link LoggedInUserRecord} identifier.
     */
    private final Token tokenId;

    /**
     * Creates new {@link LogOutUser} command.
     *
     * @param tokenId an access token identifier of {@link User}.
     */
    public LogOutUser(Token tokenId) {
        this.tokenId = checkNotNull(tokenId);
    }

    /**
     * Getter for access token identifier {@link Token}.
     *
     * @return token identifier value.
     */
    public Token tokenId() {
        return tokenId;
    }
}
