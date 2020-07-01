package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.TokenId;
import io.javaclasses.filehub.storage.user.TokenRecord;
import io.javaclasses.filehub.storage.user.TokenStorage;
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
        tester.testAllPublicInstanceMethods(new LogoutProcess(new TokenStorage()));
    }

    @DisplayName("call remove method with correct parameter from TokenStorage.")
    @Test
    void testTokenRemove() {
        boolean[] isRemoveCalled = {false};
        TokenId logoutTokenId = new TokenId("qwertyuiop");
        LogOutUser logOutUserCommand = new LogOutUser(logoutTokenId);

        TokenStorage mockTokenStorage = new TokenStorage() {
            @Override
            public synchronized TokenRecord remove(TokenId id) {
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
