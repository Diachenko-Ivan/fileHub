package io.javaclasses.filehub.storage.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.Instant;

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
        TokenId tokenId = new TokenId("qwewerte");
        TokenRecord tokenRecord = new TokenRecord(tokenId, new UserId("asdsdf"), Instant.now());

        tokenStorage.add(tokenRecord);

        tokenStorage.remove(tokenId);

        assertWithMessage("Removed token record still exists in the storage.")
                .that(tokenStorage.find(tokenId).orElse(null))
                .isNull();


    }
}
