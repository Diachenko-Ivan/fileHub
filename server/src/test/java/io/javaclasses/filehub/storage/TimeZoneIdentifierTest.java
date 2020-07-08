package io.javaclasses.filehub.storage;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@DisplayName("TimeZoneIdentifier should ")
class TimeZoneIdentifierTest {

    @DisplayName("return timezone.")
    @Test
    void testReturnOfZoneIdentifier() {
        assertDoesNotThrow(TimeZoneIdentifier::get,
                "An exception was thrown although time zone is correct.");
    }
}
