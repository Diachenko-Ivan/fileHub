package io.javaclasses.filehub.web.deserializer;

import com.google.common.testing.NullPointerTester;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import io.javaclasses.filehub.api.user.AuthenticateUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Type;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("AuthenticateUserDeserializer should ")
class AuthenticateUserDeserializerTest {

    @DisplayName("not accept null params to methods.")
    @Test
    void testNullMethodParam() throws NoSuchMethodException {
        NullPointerTester tester = new NullPointerTester();
        tester.ignore(AuthenticateUserDeserializer.class.getMethod("deserialize",
                JsonElement.class, Type.class, JsonDeserializationContext.class));
        tester.testAllPublicInstanceMethods(new AuthenticateUserDeserializer());
    }

    @DisplayName("deserialize into AuthenticateUser.")
    @Test
    void testSuccessfulDeserialization() {
        AuthenticateUserDeserializer deserializer = new AuthenticateUserDeserializer();

        String json = "{\"login\":\"robert\", \"password\": \"Password1\"}";

        AuthenticateUser deserializedCommand = deserializer.deserialize(json);

        assertWithMessage("Login should be correctly deserialized but it is not.")
                .that(deserializedCommand.login().value()).isEqualTo("robert");

        assertWithMessage("Password should be correctly deserialized but it is not.")
                .that(deserializedCommand.password().value()).isEqualTo("Password1");
    }

    @DisplayName("throw JsonParseException because of incorrect JSON.")
    @Test
    void testIncorrectJson() {
        AuthenticateUserDeserializer deserializer = new AuthenticateUserDeserializer();
        assertThrows(JsonParseException.class, () -> deserializer.deserialize("d"),
                "Should throw JsonParseException due to bad json string.");
    }
}
