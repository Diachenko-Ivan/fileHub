package io.javaclasses.filehub.storage.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("UserStorageTest should ")
class UserStorageTest {

    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testConstructorNullParams() {
        assertThrows(NullPointerException.class, () -> new UserStorage(null),
                "Should throw NullPointerException due to null constructor parameters.");
    }

    @DisplayName("test acceptance of null parameters to add method.")
    @Test
    void testAddMethodNullParams() {
        UserStorage storage = new UserStorage(new HashMap<>());
        assertThrows(NullPointerException.class, () -> storage.add(null),
                "Should throw NullPointerException due to null add method parameters.");

    }

    @DisplayName("test the return of correct user by his login.")
    @Test
    void testReturnOfCorrectUserByLogin() {
        UserId firstUserId = new UserId("1");
        UserId secondUserId = new UserId("2");
        UserId thirdUserId = new UserId("3");
        User firstUser = new User(firstUserId, "john", "dou");
        User secondUser = new User(secondUserId, "linus", "torvald");
        User thirdUser = new User(firstUserId, "robert", "martin");
        String searchUserLogin = "linus";
        HashMap<UserId, User> mockMap = new HashMap<UserId, User>() {{
            put(firstUserId, firstUser);
            put(secondUserId, secondUser);
            put(thirdUserId, thirdUser);
        }};
        UserStorage storage = new UserStorage(mockMap);
        assertWithMessage("Should find correct user by his login but it is not found.")
                .that(storage.findByLogin(searchUserLogin).get()).isEqualTo(secondUser);
    }

    @DisplayName("test the return of non-existent user by login.")
    @Test
    void testReturnOfNonExistentUserByLogin() {
        UserId firstUserId = new UserId("1");
        UserId secondUserId = new UserId("2");
        UserId thirdUserId = new UserId("3");
        User firstUser = new User(firstUserId, "john", "dou");
        User secondUser = new User(secondUserId, "linus", "torvald");
        User thirdUser = new User(firstUserId, "robert", "martin");
        String searchUserLogin = "unknown";
        HashMap<UserId, User> mockMap = new HashMap<UserId, User>() {{
            put(firstUserId, firstUser);
            put(secondUserId, secondUser);
            put(thirdUserId, thirdUser);
        }};
        UserStorage storage = new UserStorage(mockMap);
        assertWithMessage("Should not find user by login because there is no user with such login.")
                .that(storage.findByLogin(searchUserLogin)).isEqualTo(Optional.empty());
    }

    @DisplayName("test the return of correct user by login and password.")
    @Test
    void testReturnOfCorrectUserByLoginAndPassword() {
        UserId firstUserId = new UserId("1");
        UserId secondUserId = new UserId("2");
        UserId thirdUserId = new UserId("3");
        User firstUser = new User(firstUserId, "john", "dou");
        User secondUser = new User(secondUserId, "linus", "torvald");
        User thirdUser = new User(firstUserId, "robert", "martin");
        String searchUserLogin = "robert";
        String searchUserPassword = "martin";
        HashMap<UserId, User> mockMap = new HashMap<UserId, User>() {{
            put(firstUserId, firstUser);
            put(secondUserId, secondUser);
            put(thirdUserId, thirdUser);
        }};
        UserStorage storage = new UserStorage(mockMap);
        assertWithMessage("Should not find user by login because there is no user with such login.")
                .that(storage.findByLoginAndPassword(searchUserLogin, searchUserPassword).get())
                .isEqualTo(thirdUser);
    }

    @DisplayName("test the return of non-existent user by login and password.")
    @Test
    void testReturnOfNonExistentUserByLoginAndPassword() {
        UserId firstUserId = new UserId("1");
        UserId secondUserId = new UserId("2");
        UserId thirdUserId = new UserId("3");
        User firstUser = new User(firstUserId, "john", "dou");
        User secondUser = new User(secondUserId, "linus", "torvald");
        User thirdUser = new User(firstUserId, "robert", "martin");
        String searchUserLogin = "unknownLogin";
        String searchUserPassword = "unknownPassword";
        HashMap<UserId, User> mockMap = new HashMap<UserId, User>() {{
            put(firstUserId, firstUser);
            put(secondUserId, secondUser);
            put(thirdUserId, thirdUser);
        }};
        UserStorage storage = new UserStorage(mockMap);
        assertWithMessage("Should not find user by login because there is no user with such login.")
                .that(storage.findByLoginAndPassword(searchUserLogin, searchUserPassword))
                .isEqualTo(Optional.empty());
    }
}