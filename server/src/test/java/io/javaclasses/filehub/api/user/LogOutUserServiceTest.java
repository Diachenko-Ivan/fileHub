package io.javaclasses.filehub.api.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@DisplayName("LogOutUserService should ")
class LogOutUserServiceTest {

    @Test
    @DisplayName("successfully log out user.")
    void testSuccessfulLogOut() {
        LogOutUserService logOutService = new LogOutUserServiceImpl();
        assertDoesNotThrow(() -> logOutService.logOut("janadfno"), "Should not throw AuthorizationException");
    }
}