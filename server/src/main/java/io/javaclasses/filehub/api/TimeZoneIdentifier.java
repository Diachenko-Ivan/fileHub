package io.javaclasses.filehub.api;

import java.time.ZoneId;

/**
 * Identifier of the selected time zone.
 * <p>Contains single method that returns {@link ZoneId} instance.
 */
public class TimeZoneIdentifier {
    /**
     * Returns an identifier of a time zone.
     *
     * @return identifier of a time zone.
     */
    public static synchronized ZoneId get() {
        return ZoneId.of("Europe/Kiev");
    }
}
