package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.LoggedInUserRecord;
import io.javaclasses.filehub.storage.user.LoggedInUserStorage;
import io.javaclasses.filehub.storage.user.Token;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("LogoutProcess should ")
class LogoutProcessTest {

    @DisplayName("not accept null parameters to constructor and method.")
    @Test
    void testNullParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(LogoutProcess.class);
        tester.testAllPublicInstanceMethods(new LogoutProcess(new LoggedInUserStorage()));
    }

    @DisplayName("call remove method with correct parameter from TokenStorage.")
    @Test
    void testTokenRemove() {
        boolean[] isRemoveCalled = {false};
        Token logoutTokenId = new Token("qwertyuiop");
        LogOutUser logOutUserCommand = new LogOutUser(logoutTokenId);

        LoggedInUserStorage mockTokenStorage = new LoggedInUserStorage() {
            @Override
            public synchronized LoggedInUserRecord remove(Token id) {
                if (id.equals(logoutTokenId)) {
                    isRemoveCalled[0] = true;
                }
                return null;
            }
        };
        LogoutProcess process = new LogoutProcess(mockTokenStorage);

        process.logOut(logOutUserCommand);

        assertWithMessage("Token removing was not called or transferred token identifier is incorrect.")
                .that(isRemoveCalled[0])
                .isTrue();
    }
}
