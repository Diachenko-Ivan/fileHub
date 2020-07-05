package io.javaclasses.filehub.storage.user;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.TimeZoneIdentifier;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("LoggedInUserStorage should ")
class LoggedInUserStorageTest {

    private LoggedInUserStorage prepareLoggedInUserStorageWithExistingUsers(LoggedInUserRecord... records) {
        LoggedInUserStorage storage = new LoggedInUserStorage();
        for (LoggedInUserRecord record : records) {
            storage.add(record);
        }
        return storage;
    }

    @DisplayName("not accept null parameters to methods.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicInstanceMethods(new LoggedInUserStorage());
    }

    @DisplayName("remove logged in user.")
    @Test
    void testLoggedInUserRemove() {
        Token token = new Token("qwewerte");
        LoggedInUserStorage loggedInUserStorage = prepareLoggedInUserStorageWithExistingUsers(
                new LoggedInUserRecord(token, new UserId("asdsdf"),
                        LocalDateTime.now(TimeZoneIdentifier.get()).plusMinutes(5)));

        loggedInUserStorage.remove(token);

        assertWithMessage("Removed record still exists in the storage.")
                .that(loggedInUserStorage.find(token).orElse(null))
                .isNull();
    }

    @DisplayName("not find user by non existent token.")
    @Test
    void testNotFoundUserBy() {
        LoggedInUserStorage loggedInUserStorage = prepareLoggedInUserStorageWithExistingUsers(
                new LoggedInUserRecord(new Token("safdgsfhgff"), new UserId("asdsdf"),
                        LocalDateTime.now(TimeZoneIdentifier.get()).plusMinutes(5)));

        Token anotherToken = new Token("qwewerte");

        assertWithMessage("Logged in user was found by non existent token.")
                .that(loggedInUserStorage.find(anotherToken).orElse(null))
                .isNull();
    }

    @DisplayName("find user by non expired token.")
    @Test
    void testFindLoggedInUserByToken() {
        Token token = new Token("qwewerte");
        LoggedInUserRecord loggedInUserRecord = new LoggedInUserRecord(token, new UserId("asdsdf"),
                LocalDateTime.now(TimeZoneIdentifier.get()).plusMinutes(2));

        LoggedInUserStorage loggedInUserStorage = prepareLoggedInUserStorageWithExistingUsers(loggedInUserRecord);

        LoggedInUserRecord foundLoggedInUser = loggedInUserStorage.find(token).orElse(null);

        assertWithMessage("Logged in user is not found in the storage.")
                .that(foundLoggedInUser)
                .isNotNull();

        assertWithMessage("Found logged in user is not equal to searched user.")
                .that(foundLoggedInUser)
                .isEqualTo(loggedInUserRecord);
    }

    @DisplayName("not find user by expired token.")
    @Test
    void testNotFoundUserByExpiredToken() {
        Token token = new Token("qwewerte");
        LoggedInUserRecord userWithExpiredToken = new LoggedInUserRecord(token, new UserId("asdsdf"),
                LocalDateTime.now(TimeZoneIdentifier.get()).minusMinutes(5));

        LoggedInUserStorage loggedInUserStorage = prepareLoggedInUserStorageWithExistingUsers(userWithExpiredToken);

        LoggedInUserRecord foundLoggedInUser = loggedInUserStorage.find(token).orElse(null);

        assertWithMessage("Logged in user is still in the storage although token is expired.")
                .that(foundLoggedInUser)
                .isNull();
    }
}
