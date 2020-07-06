package io.javaclasses.filehub.web.routes;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.user.CurrentUserIdHolder;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.item.folder.FileItemCount;
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

@DisplayName("FolderCreationRoute should ")
class FolderCreationRouteTest {

    private static Stream<Arguments> requestFolderIdParams() {
        return Stream.of(
                Arguments.of("aofasoo"),
                Arguments.of("sijdoudfiouos"),
                Arguments.of("ldjfgudfudvuif"));
    }

    private FolderMetadataRecord createFolderWithFolderIdAndOwnerId(FolderId folderId, UserId folderOwnerId) {
        return new FolderMetadataRecord(
                folderId,
                new ItemName("sdg"),
                folderOwnerId,
                new FileItemCount(0),
                new FolderId("sijgiojodf"));
    }

    private FolderMetadataStorage mockFolderMetadataStorageWithFindResult(FolderMetadataRecord record) {
        return new FolderMetadataStorage() {
            @Override
            public synchronized Optional<FolderMetadataRecord> find(FolderId id) {
                return Optional.ofNullable(record);
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
        tester.testAllPublicConstructors(FolderCreationRoute.class);
    }

    @DisplayName("return 200 status.")
    @ParameterizedTest
    @MethodSource("requestFolderIdParams")
    void testFolderCreation(String requestParam) {
        UserId currentUserId = new UserId("qwerwer");

        CurrentUserIdHolder.set(currentUserId);

        FolderMetadataStorage mockFolderStorage =
                mockFolderMetadataStorageWithFindResult(
                        createFolderWithFolderIdAndOwnerId(new FolderId(requestParam), currentUserId));

        FolderCreationRoute authenticationRoute = new FolderCreationRoute(mockFolderStorage);

        Request mockRequest = mockRequestWithParam(requestParam);
        Response mockResponse = mockResponse();

        authenticationRoute.handle(mockRequest, mockResponse);

        assertWithMessage("Response status is not 422.")
                .that(mockResponse.status())
                .isEqualTo(200);
    }

    @DisplayName("return 404 status.")
    @ParameterizedTest
    @MethodSource("requestFolderIdParams")
    void testNotFoundStatusReturn(String requestParam) {
        UserId currentUserId = new UserId("qwerwer");

        CurrentUserIdHolder.set(currentUserId);

        FolderMetadataStorage mockFolderStorage =
                mockFolderMetadataStorageWithFindResult(null);

        FolderCreationRoute authenticationRoute = new FolderCreationRoute(mockFolderStorage);

        Request mockRequest = mockRequestWithParam(requestParam);
        Response mockResponse = mockResponse();

        authenticationRoute.handle(mockRequest, mockResponse);

        assertWithMessage("Response status is not 422.")
                .that(mockResponse.status())
                .isEqualTo(404);
    }
}
