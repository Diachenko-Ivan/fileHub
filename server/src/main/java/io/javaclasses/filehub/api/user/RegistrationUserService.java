package io.javaclasses.filehub.api.user;

/**
 * Used for user registration.
 */
public interface RegistrationUserService {
    /**
     * Registers new user.
     *
     * @param registerUser login and password.
     * @throws CredentialValidationException if user with this credentials already exists.
     */
    void register(RegisterUser registerUser) throws CredentialValidationException;
}
