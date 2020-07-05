package io.javaclasses.filehub.storage.user;

import io.javaclasses.filehub.storage.InMemoryStorage;
import io.javaclasses.filehub.storage.TimeZoneIdentifier;

import java.util.Optional;

import static java.time.LocalDateTime.now;
import static java.util.Optional.empty;
import static java.util.Optional.of;

/**
 * Implementation of in-memory application storage for {@link LoggedInUserRecord}.
 */
public class TokenStorage extends InMemoryStorage<Token, LoggedInUserRecord> {

    /**
     * Returns {@link LoggedInUserRecord} checking token expiration date beforehand.
     * <p>If a token is already expired, it is being deleted and method returns <i>null</i>.
     *
     * @param id record identifier.
     * @return logged in user record by {@code id}.
     */
    @Override
    public Optional<LoggedInUserRecord> find(Token id) {
        Optional<LoggedInUserRecord> loggedInUser = super.find(id);
        if (!loggedInUser.isPresent()) {
            return empty();
        }

        LoggedInUserRecord loggedInUserRecord = loggedInUser.get();

        if (now(TimeZoneIdentifier.get()).isAfter(loggedInUserRecord.expirationDate())) {
            remove(loggedInUserRecord.id());
            return empty();
        }

        return of(loggedInUserRecord);
    }
}
