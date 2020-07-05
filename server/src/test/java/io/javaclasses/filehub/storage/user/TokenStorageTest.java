package io.javaclasses.filehub.storage.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("TokenStorage should ")
class TokenStorageTest {

    @DisplayName("not accept null parameters to methods.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicInstanceMethods(new TokenStorage());
    }

    @DisplayName("not accept null parameters to methods.")
    @Test
    void testTokenRemove() {
        TokenStorage tokenStorage = new TokenStorage();
        Token token = new Token("qwewerte");
        LoggedInUserRecord loggedInUserRecord = new LoggedInUserRecord(token, new UserId("asdsdf"), LocalDateTime.now());

        tokenStorage.add(loggedInUserRecord);

        tokenStorage.remove(token);

        assertWithMessage("Removed token record still exists in the storage.")
                .that(tokenStorage.find(token).orElse(null))
                .isNull();


    }
}
