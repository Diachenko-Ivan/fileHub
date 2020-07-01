package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.Process;
import io.javaclasses.filehub.storage.user.TokenRecord;
import io.javaclasses.filehub.storage.user.TokenStorage;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The process in the application that handles {@link LogOutUser} command.
 * <p>Provides user logout functionality.</p>
 */
public class LogoutProcess implements Process {
    /**
     * Storage for access tokens {@link TokenRecord}.
     */
    private final TokenStorage storage;

    /**
     * Creates new {@link LogoutProcess} instance.
     *
     * @param storage storage with tokens.
     */
    public LogoutProcess(TokenStorage storage) {
        this.storage = checkNotNull(storage);
    }

    /**
     * Logs out the user from the application.
     * <p>Under logout it is supposed to remove the token {@link TokenRecord} from the {@link TokenStorage}.
     *
     * @param logOutCommand command to log out user.
     */
    public void logOut(LogOutUser logOutCommand) {
        checkNotNull(logOutCommand);
        storage.remove(logOutCommand.tokenId());
    }
}
