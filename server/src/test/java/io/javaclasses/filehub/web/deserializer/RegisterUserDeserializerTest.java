package io.javaclasses.filehub.web.deserializer;

import com.google.common.testing.NullPointerTester;
import com.google.gson.*;
import io.javaclasses.filehub.api.user.RegisterUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Type;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("RegisterUserDeserializerTest should ")
class RegisterUserDeserializerTest {

    @DisplayName("test acceptance of null parameters to deserialize() method.")
    @Test
    void testNullMethodParam() throws NoSuchMethodException {
        NullPointerTester tester = new NullPointerTester();
        tester.ignore(RegisterUserDeserializer.class.getMethod("deserialize",
                JsonElement.class, Type.class, JsonDeserializationContext.class));
        tester.testAllPublicInstanceMethods(new RegisterUserDeserializer());
    }

    @DisplayName("test successful deserialization.")
    @Test
    void testSuccessfulDeserialization() {
        RegisterUserDeserializer deserializer = new RegisterUserDeserializer();
        String registerUserJson = "{\"login\":\"robert\", \"password\": \"Password1\"}";
        RegisterUser deserializedCommand = deserializer.deserialize(registerUserJson);
        assertWithMessage("Login should be correctly deserialized but it is not.")
                .that(deserializedCommand.login().value()).isEqualTo("robert");
        assertWithMessage("Password should be correctly deserialized but it is not.")
                .that(deserializedCommand.password().value()).isEqualTo("Password1");
    }

    @DisplayName("test successful deserialization.")
    @Test
    void testParseException() {
        RegisterUserDeserializer deserializer = new RegisterUserDeserializer();
        assertThrows(JsonParseException.class, () -> deserializer.deserialize("bad_json"),
                "Should throw JsonParseException due to bad json string.");
    }
}
