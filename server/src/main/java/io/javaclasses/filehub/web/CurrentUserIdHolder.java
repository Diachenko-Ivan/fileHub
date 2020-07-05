package io.javaclasses.filehub.web;

import io.javaclasses.filehub.storage.user.UserId;

/**
 * Holder for authorized user identifier {@link UserId}.
 * <p>Uses functionality of {@link ThreadLocal}.
 */
public class CurrentUserIdHolder {
    /**
     * Container for an identifier of authorized user within one thread.
     */
    private static final ThreadLocal<UserId> USER_THREAD_SCOPE = new ThreadLocal<>();

    /**
     * Sets authorized user identifier to thread-local variables.
     *
     * @param currentUserId an identifier of authorized user {@link io.javaclasses.filehub.storage.user.User}.
     */
    public static void set(UserId currentUserId) {
        USER_THREAD_SCOPE.set(currentUserId);
    }

    /**
     * Returns authorized user identifier within current thread.
     *
     * @return current user identifier.
     */
    public static UserId get() {
        return USER_THREAD_SCOPE.get();
    }
}
