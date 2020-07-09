package io.javaclasses.filehub.api.item.folder;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Set;
import java.util.stream.Stream;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.item.folder.NewFolderNameGenerator.generateName;

@DisplayName("NewFolderNameGenerator should ")
class NewFolderNameGeneratorTest {

    private static Stream<Arguments> existingNamesWithExpectedName() {
        return Stream.of(
                Arguments.of(new String[]{"New Folder(0)", "New Folder(1)",
                        "New Folder(2)", "New Folder(3)", "New Folder(4)"}, "New Folder(5)"),
                Arguments.of(new String[]{"New Folder(0)", "New Folder (1)"}, "New Folder(1)"),
                Arguments.of(new String[]{"New folder(0)", "New Folder{0}",
                        "New Folder(0hdf)", "New Folderfjghj(1)", "New Folderidfjog"}, "New Folder(0)"));
    }

    @DisplayName("not accept null parameters to generateName() method.")
    @Test
    void testNullConstructorParameters() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicStaticMethods(NewFolderNameGenerator.class);
    }

    @DisplayName("generate a unique folder name.")
    @ParameterizedTest
    @MethodSource("existingNamesWithExpectedName")
    void testGenerateUniqueName(String[] existingFolderNames, String expectedName) {
        String actualName = generateName(Set.of(existingFolderNames));

        assertWithMessage("New generated folder name is incorrect.")
                .that(actualName)
                .isEqualTo(expectedName);
    }
}
