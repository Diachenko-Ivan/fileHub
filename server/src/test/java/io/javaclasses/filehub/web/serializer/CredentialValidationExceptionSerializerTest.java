package io.javaclasses.filehub.web.serializer;

import io.javaclasses.filehub.api.user.CredentialValidationException;
import io.javaclasses.filehub.api.user.FailedCredential;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("CredentialValidationExceptionSerializerTest should ")
class CredentialValidationExceptionSerializerTest {

    @DisplayName("test acceptance of null parameters to serialize() method.")
    @Test
    void testNullMethodParam() {
        assertThrows(NullPointerException.class,
                () -> new CredentialValidationExceptionSerializer().serialize(null),
                "Should throw NullPointerException due to null method parameters.");
    }

    @DisplayName("test correctness of serialized json.")
    @Test
    void testCorrectJsonResult() {
        CredentialValidationExceptionSerializer serializer = new CredentialValidationExceptionSerializer();
        FailedCredential failedCredential = new FailedCredential("login", "Wrong length");

        String json = serializer.serialize(new CredentialValidationException(new FailedCredential[]{failedCredential}));
        String expectedJson = "{\"errors\":[{\"field\":\"login\",\"message\":\"Wrong length\"}]}";

        assertWithMessage("JSONs should be equal but they are not.")
                .that(json).isEqualTo(expectedJson);
    }
}