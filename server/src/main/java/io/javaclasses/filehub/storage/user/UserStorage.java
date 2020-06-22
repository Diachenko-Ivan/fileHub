package io.javaclasses.filehub.storage.user;

import com.google.common.base.Preconditions;
import io.javaclasses.filehub.storage.Storage;

import java.util.HashMap;
import java.util.Optional;

/**
 * Used for executing CRUD operations with user {@link User}.
 */
public class UserStorage implements Storage<UserId, User> {
    /**
     * Stores users {@link User}.
     */
    private final HashMap<UserId, User> users;

    /**
     * Creates new {@link UserStorage} instance.
     *
     * @param users initial map.
     */
    public UserStorage(HashMap<UserId, User> users) {
        Preconditions.checkNotNull(users);
        this.users = users;
    }

    /**
     * Adds new user to storage.
     *
     * @param user added user.
     */
    public synchronized void add(User user) {
        Preconditions.checkNotNull(user);
        users.put(user.id(), user);
    }

    /**
     * Returns user by his login and password.
     *
     * @param login    user login.
     * @param password user password.
     * @return {@link Optional<User>} with the same login and password.
     */
    public synchronized Optional<User> findByLoginAndPassword(String login, String password) {
        return this.users.values()
                .stream()
                .filter(u -> u.login().equals(login) && u.password().equals(password))
                .findFirst();
    }

    /**
     * Returns user by his login.
     *
     * @param login user login.
     * @return {@link Optional<User>} with the same login.
     */
    public synchronized Optional<User> findByLogin(String login) {
        return this.users.values()
                .stream()
                .filter(u -> u.login().equals(login))
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
