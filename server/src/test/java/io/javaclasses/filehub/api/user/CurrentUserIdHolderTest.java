package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("CurrentUserIdHolder should ")
class CurrentUserIdHolderTest {

    @DisplayName("not accept null parameters methods.")
    @Test
    void testNullParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicStaticMethods(CurrentUserIdHolder.class);
    }

    @DisplayName("not accept null parameters methods.")
    @Test
    void testSettingInThreadLocalVariable() {
        UserId currentUserId = new UserId("qweqwerwerrt");
        CurrentUserIdHolder.set(currentUserId);

        Truth.assertWithMessage("User identifier in thread-local variable is not equal to set identifier.")
                .that(CurrentUserIdHolder.get())
                .isEqualTo(currentUserId);
    }
}