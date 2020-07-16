package io.javaclasses.filehub.api.item.file;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static nl.jqno.equalsverifier.EqualsVerifier.forClass;

@DisplayName("FileDto should ")
class FileDtoTest {

    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(FileDto.class);
    }

    @DisplayName("implement correct equal and hashcode methods.")
    @Test
    public void testEqualsContract() {
        forClass(FileDto.class).verify();
    }

}
