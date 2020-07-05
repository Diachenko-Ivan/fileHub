package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.LoggedInUserRecord;
import io.javaclasses.filehub.storage.user.LoggedInUserStorage;
import io.javaclasses.filehub.storage.user.Token;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static java.util.Optional.empty;

@DisplayName("AuthorizationService should ")
class LoggedInUserIdTest {

    @DisplayName("not accept null parameters to constructor and method.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(LoggedInUserId.class);
        tester.testAllPublicInstanceMethods(new LoggedInUserId(new LoggedInUserStorage()));
    }


    @DisplayName("not authorize user because of not found token.")
    @Test
    void testFailedUserAuthorization() {
        LoggedInUserStorage mockLoggedInUserStorage = new LoggedInUserStorage() {
            @Override
            public synchronized Optional<LoggedInUserRecord> find(Token id) {
                return empty();
            }
        };
        LoggedInUserId loggedInUserId = new LoggedInUserId(mockLoggedInUserStorage);
        UserId userId = loggedInUserId.get(new Token("any_token"));

        assertWithMessage("User identifier is not null but must be because access token is not found.")
                .that(userId)
                .isNull();
    }
}
