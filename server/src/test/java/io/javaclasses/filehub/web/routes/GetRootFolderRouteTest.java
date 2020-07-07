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
import spark.Request;
import spark.Response;

import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("GetRootFolderRoute should ")
class GetRootFolderRouteTest {

    private FolderMetadataRecord createFolderWithFolderIdAndOwnerId(FolderId folderId, UserId folderOwnerId) {
        return new FolderMetadataRecord(
                folderId,
                new ItemName("sdg"),
                folderOwnerId,
                new FileItemCount(0),
                new FolderId("sijgiojodf"));
    }

    private FolderMetadataStorage mockFolderMetadataStorageWithFindRootResult(FolderMetadataRecord record) {
        return new FolderMetadataStorage() {
            @Override
            public synchronized Optional<FolderMetadataRecord> findRoot(UserId id) {
                return Optional.ofNullable(record);
            }
        };
    }

    private Request mockRequest() {
        return new Request() {
        };
    }

    private Response mockResponse() {
        return new Response() {
            int status;

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
        tester.testAllPublicConstructors(GetRootFolderRoute.class);
    }

    @DisplayName("return 200 status and folder identifier in body.")
    @Test
    void testReturnOfRootFolderIdentifier() {
        UserId currentUserId = new UserId("qwerwer");
        String rootFolderIdentifier = "uioshsoehfgedior";
        CurrentUserIdHolder.set(currentUserId);

        FolderMetadataStorage mockFolderStorage =
                mockFolderMetadataStorageWithFindRootResult(
                        createFolderWithFolderIdAndOwnerId(new FolderId(rootFolderIdentifier), currentUserId));

        GetRootFolderRoute authenticationRoute = new GetRootFolderRoute(mockFolderStorage);

        Request mockRequest = mockRequest();
        Response mockResponse = mockResponse();

        Object identifier = authenticationRoute.handle(mockRequest, mockResponse);

        assertWithMessage("The response body does not contain an identifier.")
                .that(identifier)
                .isEqualTo(rootFolderIdentifier);

        assertWithMessage("the response status is not 200.")
                .that(mockResponse.status())
                .isEqualTo(200);
    }
}
