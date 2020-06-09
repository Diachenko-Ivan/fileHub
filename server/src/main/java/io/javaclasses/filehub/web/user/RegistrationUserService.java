package io.javaclasses.filehub.web.user;

/**
 * Used for user registration.
 */
public interface RegistrationUserService {
    /**
     * Registers new user.
     *
     * @param userCredentials login and password.
     * @throws CredentialValidationException if user with this credentials already exists.
     */
    void register(UserCredentials userCredentials) throws CredentialValidationException;
}
