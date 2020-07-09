package io.javaclasses.filehub.web.routes;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.user.CurrentUserIdHolder;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import spark.Request;
import spark.Response;

import java.util.Optional;
import java.util.stream.Stream;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("GetFolderRoute should ")
class GetFolderRouteTest {

    private static Stream<Arguments> requestFolderIdParams() {
        return Stream.of(
                Arguments.of("jdfjkgfght"),
                Arguments.of("sijdoudfiouos"),
                Arguments.of("ldjfgudfudvuif"));
    }

    private FolderMetadataRecord createFolderWith(FolderId folderId, UserId ownerId) {
        return new FolderMetadataRecord(
                folderId,
                new FileSystemItemName("sdg"),
                ownerId,
                new FolderId("sijgiojodf"));
    }

    private FolderMetadataStorage mockFolderMetadataStorageWith(FolderMetadataRecord folderToBeFoundAlways) {
        return new FolderMetadataStorage() {
            @Override
            public synchronized Optional<FolderMetadataRecord> find(FolderId id, UserId ownerId) {
                return Optional.ofNullable(folderToBeFoundAlways);
            }
        };
    }

    private Request mockRequestWithParam(String folderId) {
        return new Request() {
            @Override
            public String params(String param) {
                return folderId;
            }
        };
    }

    private Response mockResponse() {
        return new Response() {
            int status;

            @Override
            public void type(String contentType) {
            }

            @Override
            public void status(int statusCode) {
                status = statusCode;
            }

            @Override
            public int status() {
                return status;
            }
        };
    }

    @DisplayName("not accept null parameters to constructor.")
    @Test
    void testNullParam() {
        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(GetFolderRoute.class);
    }

    @DisplayName("manage call of folder view and return status 200.")
    @ParameterizedTest
    @MethodSource("requestFolderIdParams")
    void testGetOfFolder(String folderIdParam) {
        UserId currentUserId = new UserId("qwerwer");

        CurrentUserIdHolder.set(currentUserId);

        FolderMetadataRecord requestedFolder = createFolderWith(new FolderId(folderIdParam), currentUserId);

        FolderMetadataStorage mockFolderStorage = mockFolderMetadataStorageWith(requestedFolder);

        GetFolderRoute authenticationRoute = new GetFolderRoute(mockFolderStorage);

        Request mockRequest = mockRequestWithParam(folderIdParam);
        Response mockResponse = mockResponse();

        authenticationRoute.handle(mockRequest, mockResponse);

        assertWithMessage("Response status is not 200 although folder exists.")
                .that(mockResponse.status())
                .isEqualTo(200);
    }

    @DisplayName("return 404 response status because of not found folder.")
    @ParameterizedTest
    @MethodSource("requestFolderIdParams")
    void testReturnOfNotFoundError(String folderIdParam) {
        UserId currentUserId = new UserId("qwerwer");

        CurrentUserIdHolder.set(currentUserId);

        FolderMetadataStorage mockFolderStorage = mockFolderMetadataStorageWith(null);

        GetFolderRoute authenticationRoute = new GetFolderRoute(mockFolderStorage);

        Request mockRequest = mockRequestWithParam(folderIdParam);
        Response mockResponse = mockResponse();

        authenticationRoute.handle(mockRequest, mockResponse);

        assertWithMessage("Response status is not 404 although folder does not exist.")
                .that(mockResponse.status())
                .isEqualTo(404);
    }
}
