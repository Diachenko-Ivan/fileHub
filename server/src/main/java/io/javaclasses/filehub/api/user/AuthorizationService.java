package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.storage.user.*;

import java.util.Date;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Service for getting of identifier of authorized user {@link User}.
 */
public class AuthorizationService {
    /**
     * Storage for tokens {}.
     */
    private final TokenStorage tokenStorage;

    /**
     * Creates new {@link AuthorizationService} instance.
     *
     * @param tokenStorage storage for tokens {@link TokenRecord}.
     */
    public AuthorizationService(TokenStorage tokenStorage) {
        this.tokenStorage = checkNotNull(tokenStorage);
    }


    /**
     * Returns authorized user identifier by {@code tokenValue}.
     * <p>If user is not found by token or token is already expired method returns <i>null</i>.
     *
     * @param tokenId user access token identifier.
     * @return identifier of authorized user or {@code null} if user is not authorized.
     */
    public UserId authorizedUserId(String tokenId) {
        checkNotNull(tokenId);
        Optional<TokenRecord> token = tokenStorage.find(new TokenId(tokenId));

        if (!token.isPresent()) {
            return null;
        }
        TokenRecord tokenRecord = token.get();
        if (new Date().after(tokenRecord.expirationDate())) {
            tokenStorage.remove(tokenRecord.id());
            return null;
        }
        return tokenRecord.userId();
    }

    /**
     * Creates new session for user saving {@link TokenRecord} instance.
     *
     * @param record token for saving in storage.
     */
    public void createSession(TokenRecord record) {
        checkNotNull(record);
        this.tokenStorage.add(record);
    }
}
