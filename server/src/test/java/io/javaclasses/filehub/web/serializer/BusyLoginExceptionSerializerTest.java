package io.javaclasses.filehub.web.serializer;

import io.javaclasses.filehub.api.user.BusyLoginException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("BusyLoginExceptionSerializerTest should ")
class BusyLoginExceptionSerializerTest {

    @DisplayName("test acceptance of null parameters to serialize() method.")
    @Test
    void testNullMethodParam() {
        assertThrows(NullPointerException.class,
                () -> new BusyLoginExceptionSerializer().serialize(null),
                "Should throw NullPointerException due to null method parameters.");
    }

    @DisplayName("test correctness of serialized json.")
    @Test
    void testCorrectJsonResult() {
        BusyLoginExceptionSerializer serializer = new BusyLoginExceptionSerializer();

        String json = serializer.serialize(new BusyLoginException("User with this login already exists."));
        String expectedJson = "{\"errors\":[{\"field\":\"login\",\"message\"" +
                ":\"User with this login already exists.\"}]}";

        assertWithMessage("JSONs should be equal but they are not.")
                .that(json).isEqualTo(expectedJson);
    }
}