package io.javaclasses.filehub.web.user;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("LogOutUserService should ")
class LogOutUserServiceTest {

    @Test
    @DisplayName("successfully log out user.")
    void testSuccessfulLogOut() {
        LogOutUserService logOutService = new LogOutUserServiceImpl();
        assertDoesNotThrow(() -> logOutService.logOut("janadfno"), "Should not throw AuthorizationException");
    }
}