package io.javaclasses.filehub.web.deserializer;

import io.javaclasses.filehub.api.user.RegisterUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("RegisterUserDeserializerTest should ")
class RegisterUserDeserializerTest {

    @DisplayName("test acceptance of null parameters to deserialize() method.")
    @Test
    void testNullMethodParam() {
        assertThrows(NullPointerException.class,
                () -> new RegisterUserDeserializer().deserialize(null),
                "Should throw NullPointerException due to null method parameters.");
    }

    @DisplayName("test successful deserialization.")
    @Test
    void testSuccessfulDeserialization() {
        RegisterUserDeserializer deserializer = new RegisterUserDeserializer();
        String registerUserJson = "{\"login\":\"robert\", \"password\": \"Password1\"}";
        RegisterUser deserializedCommand = deserializer.deserialize(registerUserJson);
        assertWithMessage("Login should be correctly deserialized but it is not.")
                .that(deserializedCommand.login()).isEqualTo("robert");
        assertWithMessage("Password should be correctly deserialized but it is not.")
                .that(deserializedCommand.password()).isEqualTo("Password1");
    }
}