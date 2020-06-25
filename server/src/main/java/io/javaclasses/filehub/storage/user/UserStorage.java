package io.javaclasses.filehub.storage.user;

import io.javaclasses.filehub.storage.InMemoryStorage;

import java.util.HashMap;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Implementation of in-memory application storage for saving of {@link User}.
 */
public class UserStorage extends InMemoryStorage<UserId, User> {
    /**
     * Storage for users where key is {@link User} id and value is corresponding instance.
     */
    private final HashMap<UserId, User> users = new HashMap<>();

    /**
     * Adds new user to storage.
     *
     * @param user added user.
     * @throws IllegalArgumentException if user with {@code user.id()} already saved in map.
     */
    public synchronized void add(User user) {
        checkNotNull(user);
        if (users.putIfAbsent(user.id(), user) != null) {
            throw new IllegalArgumentException("User with such id is saved.");
        }
    }

    /**
     * Returns user by his {@code login} and {@code password}.
     *
     * @param login    user login.
     * @param password user hashed password.
     * @return {@link Optional<User>} with the same {@code login} and {@code password}
     * or {@code Optional.empty()} if user with such login and password was not found.
     */
    public synchronized Optional<User> findByLoginAndPassword(String login, String password) {
        checkNotNull(login);
        checkNotNull(password);
        return this.users.values()
                .stream()
                .filter(u -> u.login().equals(login) && u.password().equals(password))
                .findFirst();
    }

    /**
     * Returns user {@link Optional<User>} by his login value.
     *
     * @param value user login.
     * @return {@link Optional<User>} with the same login value
     * or {@code Optional.empty()} if user was not found.
     */
    public synchronized Optional<User> findByLogin(String value) {
        checkNotNull(value);
        return this.users.values()
                .stream()
                .filter(u -> u.login().equals(value))
                .findFirst();
    }
}
