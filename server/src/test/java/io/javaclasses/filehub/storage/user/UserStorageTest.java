package io.javaclasses.filehub.storage.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("UserStorageTest should ")
class UserStorageTest {

    @DisplayName("test acceptance of null parameters to methods.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicInstanceMethods(new UserStorage());
    }

    @DisplayName("test successful user adding.")
    @Test
    void testSuccessfulAdd() {
        UserStorage storage = new UserStorage();
        assertDoesNotThrow(() -> storage.add(new User(new UserId("id"), "linus", "torvald")),
                "Should successfully add user without exception throwing.");
    }

    @DisplayName("test throwing of exception in user adding if user with this id exists.")
    @Test
    void testUnsuccessfulAdd() {
        UserId repeatedId = new UserId("id");
        UserStorage storage = new UserStorage();
        storage.add(new User(repeatedId, "john", "dou"));
        assertThrows(IllegalArgumentException.class, () ->
                        storage.add(new User(repeatedId, "linus", "torvald")),
                "Should throw IllegalArgumentException because user with this id already exists.");
    }
}
