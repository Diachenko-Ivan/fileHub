package io.javaclasses.filehub.api.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("StringHashCreator should ")
class PasswordHasherTest {

    @DisplayName("not accept null param to hashedString method")
    @Test
    void testNullParams() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(DataValidationError.class);
        tester.testAllPublicStaticMethods(DataValidationError.class);
    }

    @DisplayName("return not null value in result of hashing.")
    @Test
    void testNotNullResultOfHashing() {
        String stringToHash = "password";
        assertWithMessage("Should not return null result of hashing.")
                .that(PasswordHasher.hash(stringToHash)).isNotNull();
    }

    @DisplayName("return the same hash in multithreading access.")
    @Test
    void testMultithreadingAccess() throws Exception {
        String passwordToHash = "testPassword";
        String expectedHash = "fd5cb51bafd60f6fdbedde6e62c473da6f247db271633e15919bab78a02ee9eb";
        Callable<String> passwordHash = () -> PasswordHasher.hash(passwordToHash);

        ExecutorService executorService = Executors.newFixedThreadPool(100);
        for (int i = 0; i < 100; i++) {
            assertWithMessage("")
                    .that(executorService.submit(passwordHash).get())
                    .isEqualTo(expectedHash);
        }
        executorService.shutdown();
    }
}
