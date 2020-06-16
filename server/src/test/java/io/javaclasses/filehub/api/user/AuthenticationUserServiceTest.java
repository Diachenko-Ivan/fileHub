package io.javaclasses.filehub.api.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("AuthenticationUserService should")
class AuthenticationUserServiceTest {

    @DisplayName("successfully login user and return access token. ")
    @Test
    void testUserLogIn() throws AuthenticationException {
        String login = "john";
        String password = "password";
        AuthenticationUserService authenticationUserService = new AuthenticationUserServiceImpl();
        TokenDto tokenDto = authenticationUserService.logIn(new RegisterUser(login, password));
        assertWithMessage("Token should not be null.").that(tokenDto).isNotNull();
    }
}