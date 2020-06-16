package io.javaclasses.filehub.api.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@DisplayName("RegistrationUserService should")
class RegistrationUserServiceTest {

    @Test
    @DisplayName("successfully register user.")
    void testSuccessfulRegistration() {
        String login = "john";
        String password = "password";
        RegistrationUserService registrationService = new RegistrationUserServiceImpl();
        assertDoesNotThrow(() -> registrationService.register(new RegisterUser(login, password)),
                "Should not throw CredentialValidationException.");
    }
}