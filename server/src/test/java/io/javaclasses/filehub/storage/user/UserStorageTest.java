package io.javaclasses.filehub.storage.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("UserStorage should ")
class UserStorageTest {

    @DisplayName("not accept null parameters to methods.")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Login.class, new Login("login"));
        tester.testAllPublicInstanceMethods(new UserStorage());
    }

    @DisplayName("successful add user adding.")
    @Test
    void testSuccessfulAdd() {
        UserStorage storage = new UserStorage();
        assertDoesNotThrow(() -> {
                    UserId userId = new UserId("id");
                    User userToAdd = new User(userId, new Login("linus"), "torvald");
                    storage.add(userToAdd);
                    User addedUser = storage.find(userId).orElse(null);
                    assertWithMessage("Found user is not equal to user that was added.")
                            .that(addedUser)
                            .isEqualTo(userToAdd);
                },
                "Should successfully add user without exception throwing.");
    }

    @DisplayName("throw exception in user adding if user with this id exists.")
    @Test
    void testUnsuccessfulAdd() {
        UserId repeatedId = new UserId("id");
        UserStorage storage = new UserStorage();
        storage.add(new User(repeatedId, new Login("john"), "dou"));
        assertThrows(IllegalArgumentException.class, () ->
                        storage.add(new User(repeatedId, new Login("linus"), "torvald")),
                "Should throw IllegalArgumentException because user with this id already exists.");
    }

    @DisplayName("return correct user by login.")
    @Test
    void testFindByLoginName() {
        UserStorage storage = new UserStorage();
        Login loginName = new Login("linus");
        User userToAdd = new User(new UserId("id"), loginName, "torvald");
        storage.add(userToAdd);

        User userByLogin = storage.find(loginName).orElse(null);
        assertWithMessage("User found by login is not equal or null.")
                .that(userByLogin)
                .isEqualTo(userToAdd);
    }

    @DisplayName("return correct user by login and password.")
    @Test
    void testFindByLoginNameAndPassword() {
        UserStorage storage = new UserStorage();
        Login loginName = new Login("linus");
        String password = "torvald";
        User userToAdd = new User(new UserId("id"), loginName, password);
        storage.add(userToAdd);

        User userByLogin = storage.find(loginName, password).orElse(null);
        assertWithMessage("User found by login and password in not equal or null.")
                .that(userByLogin)
                .isEqualTo(userToAdd);
    }

    @DisplayName("return empty result by incorrect login or password.")
    @Test
    void testFailFindByLoginIncorrectNameOrPassword() {
        UserStorage storage = new UserStorage();
        Login loginName = new Login("linus");
        String password = "torvald";
        User userToAdd = new User(new UserId("id"), loginName, password);
        storage.add(userToAdd);

        User userByLogin = storage.find(loginName, "another_password").orElse(null);
        assertWithMessage("User found by incorrect login or password must be null.")
                .that(userByLogin)
                .isNull();
    }
}
