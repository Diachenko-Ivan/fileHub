package io.javaclasses.filehub.api.item.folder;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("GetRootFolderId should ")
class GetRootFolderIdTest {

    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(GetRootFolderId.class);
    }
}
