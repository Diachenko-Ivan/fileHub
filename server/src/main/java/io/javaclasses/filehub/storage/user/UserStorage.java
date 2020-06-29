package io.javaclasses.filehub.storage.user;

import io.javaclasses.filehub.storage.InMemoryStorage;

import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Implementation of in-memory application storage for saving of {@link User}.
 */
public class UserStorage extends InMemoryStorage<UserId, User> {

    /**
     * Returns user by his {@code login} and {@code password}.
     *
     * @param login    user login.
     * @param hashedPassword user hashed password.
     * @return {@link Optional<User>} with the same {@code login} and {@code password}
     * or {@code Optional.empty()} if user with such login and password was not found.
     */
    public synchronized Optional<User> find(Login login, String hashedPassword) {
        checkNotNull(login);
        checkNotNull(hashedPassword);
        return this.records().values()
                .stream()
                .filter(u -> u.login().equals(login) && u.password().equals(hashedPassword))
                .findFirst();
    }

    /**
     * Returns user {@link Optional<User>} by his login value.
     *
     * @param value user login.
     * @return {@link Optional<User>} with the same login value
     * or {@code Optional.empty()} if user was not found.
     */
    public synchronized Optional<User> find(Login value) {
        checkNotNull(value);
        return this.records().values()
                .stream()
                .filter(u -> u.login().equals(value))
                .findFirst();
    }

    /**
     * Returns user by his id.
     *
     * @param id id of user that is being searched.
     * @return found {@link Optional<User>} or Optional.empty() if user is not found.
     */
    public synchronized Optional<User> findById(UserId id) {
        return Optional.of(this.users.get(id));
    }
}
