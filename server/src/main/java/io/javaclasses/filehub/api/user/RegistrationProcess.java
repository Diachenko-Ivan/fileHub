package io.javaclasses.filehub.api.user;

/**
 * Used for user registration.
 */
public interface RegistrationProcess {
    /**
     * Registers new user.
     *
     * @param registerUser login and password.
     * @throws BusyLoginException if user with this login already exists.
     */
    void register(RegisterUser registerUser) throws BusyLoginException;
}
