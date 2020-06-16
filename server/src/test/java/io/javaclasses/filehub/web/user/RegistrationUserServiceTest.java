package io.javaclasses.filehub.web.user;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("RegistrationUserService should")
class RegistrationUserServiceTest {

    @Test
    @DisplayName("successfully register user.")
    void testSuccessfulRegistration() {
        String login = "john";
        String password = "password";
        RegistrationUserService registrationService = new RegistrationUserServiceImpl();
        assertDoesNotThrow(() -> registrationService.register(new UserCredentials(login, password)),
                "Should not throw CredentialValidationException.");
    }
}