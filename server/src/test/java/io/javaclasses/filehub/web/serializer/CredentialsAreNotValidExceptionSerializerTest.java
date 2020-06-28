package io.javaclasses.filehub.web.serializer;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.user.CredentialsAreNotValidException;
import io.javaclasses.filehub.api.user.DataValidationError;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("CredentialValidationExceptionSerializerTest should ")
class CredentialsAreNotValidExceptionSerializerTest {

    @DisplayName("test acceptance of null parameters to serialize() method.")
    @Test
    void testNullParam() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicInstanceMethods(new CredentialsAreNotValidExceptionSerializer());
    }

    @DisplayName("test correctness of serialized json.")
    @Test
    void testCorrectJsonResult() {
        CredentialsAreNotValidExceptionSerializer serializer = new CredentialsAreNotValidExceptionSerializer();
        DataValidationError dataValidationError = new DataValidationError("login", "Wrong length");

        String json = serializer.serialize(new CredentialsAreNotValidException(new DataValidationError[]{dataValidationError}));
        String expectedJson = "{\"errors\":[{\"field\":\"login\",\"message\":\"Wrong length\"}]}";

        assertWithMessage("JSONs should be equal but they are not.")
                .that(json).isEqualTo(expectedJson);
    }
}
