package io.javaclasses.filehub.api.item.folder;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("GetFolder should ")
class GetFolderTest {
    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(UserId.class, new UserId("fks"));
        tester.setDefault(FolderId.class, new FolderId("dpkfjfiofbpf"));
        tester.testAllPublicConstructors(GetFolder.class);
    }
}
