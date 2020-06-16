package io.javaclasses.filehub.api.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("GetUserService should ")
class GetUserProcessTest {

    @DisplayName("successfully return existent user.")
    @Test
    void testSuccessfulGettingOfUser() {
        GetUserProcess userService = new GetUserProcessImpl();
        User user = userService.user("sdfsdfsdf");
        assertWithMessage("User must not be null.").that(user).isNotNull();
    }
}