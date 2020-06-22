package io.javaclasses.filehub.storage.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.HashMap;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("TokenStorageTest should ")
class TokenStorageTest {

    @DisplayName("test acceptance of null parameters to constructor.")
    @Test
    void testConstructorNullParams() {
        assertThrows(NullPointerException.class, () -> new TokenStorage(null),
                "Should throw NullPointerException due to null constructor parameters.");
    }

    @DisplayName("test acceptance of null parameters to add() method.")
    @Test
    void testAddMethodNullParams() {
        assertThrows(NullPointerException.class,
                () -> new TokenStorage(new HashMap<>()).add(null),
                "Should throw NullPointerException due to null method parameters.");
    }

    @DisplayName("test call of HashMap put() method.")
    @Test
    void testSuccessfulAddOfToken() {
        boolean[] isPutCalled = {false};
        TokenRecord record = new TokenRecord(new TokenId("qw"), "asdse", new UserId("qweqeq"), new Date());
        HashMap<String, TokenRecord> mockTokenMap = new HashMap<String, TokenRecord>() {
            @Override
            public TokenRecord put(String key, TokenRecord value) {
                assertWithMessage("Transferred TokenRecord should be equal with record that will be saved.")
                        .that(value)
                        .isEqualTo(record);
                isPutCalled[0] = true;
                return null;
            }
        };
        TokenStorage storage = new TokenStorage(mockTokenMap);
        storage.add(record);
        assertWithMessage("HashMap put() method should be called but it was not.")
                .that(isPutCalled[0])
                .isTrue();
    }

    @DisplayName("test acceptance of null parameters to remove() method.")
    @Test
    void testRemoveMethodNullParams() {
        assertThrows(NullPointerException.class,
                () -> new TokenStorage(new HashMap<>()).add(null),
                "Should throw NullPointerException due to null method parameters.");
    }

    @DisplayName("test call of HashMap put() method.")
    @Test
    void testSuccessfulRemove() {
        boolean[] isRemoveCalled = {false};
        String keyForRemove = "value";
        HashMap<String, TokenRecord> mockTokenMap = new HashMap<String, TokenRecord>() {
            @Override
            public TokenRecord remove(Object key) {
                assertWithMessage("Transferred key should be equal with key of record that will be removed.")
                        .that(key)
                        .isEqualTo(keyForRemove);
                isRemoveCalled[0] = true;
                return null;
            }
        };
        TokenStorage storage = new TokenStorage(mockTokenMap);
        storage.remove(keyForRemove);
        assertWithMessage("HashMap remove() method should be called but it was not.")
                .that(isRemoveCalled[0])
                .isTrue();
    }

    @DisplayName("test acceptance of null parameters to findByToken() method.")
    @Test
    void testFindByTokenMethodNullParams() {
        assertThrows(NullPointerException.class,
                () -> new TokenStorage(new HashMap<>()).findByToken(null),
                "Should throw NullPointerException due to null method parameters.");
    }

    @DisplayName("test call of HashMap get() method.")
    @Test
    void testSuccessfulFindByToken() {
        boolean[] isGetCalled = {false};
        String keyForSearch = "value";
        HashMap<String, TokenRecord> mockTokenMap = new HashMap<String, TokenRecord>() {
            @Override
            public TokenRecord get(Object key) {
                assertWithMessage("Transferred key should be equal with key of record that will be read.")
                        .that(key)
                        .isEqualTo(keyForSearch);
                isGetCalled[0] = true;
                return null;
            }
        };
        TokenStorage storage = new TokenStorage(mockTokenMap);
        storage.findByToken(keyForSearch);
        assertWithMessage("HashMap get() method should be called but it was not.")
                .that(isGetCalled[0])
                .isTrue();
    }
}
