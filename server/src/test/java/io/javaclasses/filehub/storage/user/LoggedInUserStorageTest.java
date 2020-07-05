package io.javaclasses.filehub.storage.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("TokenStorage should ")
class LoggedInUserStorageTest {

    @DisplayName("not accept null parameters to methods.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicInstanceMethods(new LoggedInUserStorage());
    }

    @DisplayName("not accept null parameters to methods.")
    @Test
    void testTokenRemove() {
        LoggedInUserStorage loggedInUserStorage = new LoggedInUserStorage();
        Token token = new Token("qwewerte");
        LoggedInUserRecord loggedInUserRecord = new LoggedInUserRecord(token, new UserId("asdsdf"), LocalDateTime.now());

        loggedInUserStorage.add(loggedInUserRecord);

        loggedInUserStorage.remove(token);

        assertWithMessage("Removed token record still exists in the storage.")
                .that(loggedInUserStorage.find(token).orElse(null))
                .isNull();


    }
}
