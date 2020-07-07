package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.storage.user.UserId;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Holder for authorized user identifier {@link UserId}.
 * <p>Uses functionality of {@link ThreadLocal}.
 */
public class CurrentUserIdHolder {
    /**
     * Container for an identifier of authorized user within one thread.
     */
    private static final ThreadLocal<UserId> userThreadScope = new ThreadLocal<>();

    /**
     * Sets authorized user identifier to thread-local variables.
     *
     * @param currentUserId an identifier of authorized user {@link io.javaclasses.filehub.storage.user.User}.
     */
    public static synchronized void set(UserId currentUserId) {
        userThreadScope.set(checkNotNull(currentUserId));
    }

    /**
     * Returns authorized user identifier within current thread.
     *
     * @return current user identifier.
     */
    public static synchronized UserId get() {
        return userThreadScope.get();
    }
}
