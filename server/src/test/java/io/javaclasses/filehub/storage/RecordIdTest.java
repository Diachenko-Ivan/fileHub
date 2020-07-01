package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.user.Password;
import nl.jqno.equalsverifier.EqualsVerifier;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("RecordId should ")
class RecordIdTest {

    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(Password.class);
    }

    @DisplayName("implement correct equal and hashcode methods.")
    @Test
    public void equalsContract() {
        EqualsVerifier.forClass(RecordId.class).usingGetClass().verify();
    }
}
