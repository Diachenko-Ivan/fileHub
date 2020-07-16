package io.javaclasses.filehub.web.routes;

import com.google.common.testing.NullPointerTester;
import com.google.gson.Gson;
import io.javaclasses.filehub.api.item.file.FileDto;
import io.javaclasses.filehub.api.user.CurrentUserIdHolder;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.item.file.FileContentStorage;
import io.javaclasses.filehub.storage.item.file.FileMetadataStorage;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import spark.Request;
import spark.Response;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import java.io.InputStream;
import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@DisplayName("FileUploadRoute should ")
class FileUploadRouteTest {

    private MockPart mockPart() {
        return new MockPart() {
            @Override
            public InputStream getInputStream() {
                return new InputStream() {
                    @Override
                    public int read() {
                        return 0;
                    }

                    @Override
                    public int read(byte[] b) {
                        return 30;
                    }
                };
            }

            @Override
            public String getContentType() {
                return "image.png";
            }

            @Override
            public String getSubmittedFileName() {
                return "photo.png";
            }

            @Override
            public long getSize() {
                return 100;
            }
        };
    }

    private FolderMetadataRecord createFolderWith(FolderId id, UserId ownerId) {
        return new FolderMetadataRecord(
                id,
                new FileSystemItemName("sdg"),
                ownerId,
                new FolderId("sijgiojodf"));
    }

    private FolderMetadataStorage mockFolderMetadataStorageWith(FolderMetadataRecord recordToBeAlwaysFound) {
        return new FolderMetadataStorage() {
            @Override
            public synchronized Optional<FolderMetadataRecord> find(FolderId id) {
                return Optional.ofNullable(recordToBeAlwaysFound);
            }
        };
    }

    private Request mockRequestWith(String pathParam) {
        return new Request() {
            @Override
            public String params(String param) {
                return pathParam;
            }

            @Override
            public HttpServletRequest raw() {
                return new MockHttpRequest() {
                    @Override
                    public Part getPart(String name) {
                        return mockPart();
                    }
                };
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
        tester.testAllPublicConstructors(FileUploadRoute.class);
    }

    @DisplayName("manage file uploading process.")
    @Test
    void testFileUpload() {
        String requestParamId = "lhiasldfisdi";

        UserId expectedUserId = new UserId("qwerwer");
        CurrentUserIdHolder.set(expectedUserId);

        FolderMetadataStorage mockFolderStorage =
                mockFolderMetadataStorageWith(createFolderWith(new FolderId(requestParamId), expectedUserId));

        FileUploadRoute route = new FileUploadRoute(new FileMetadataStorage(), new FileContentStorage(), mockFolderStorage);

        Request mockRequest = mockRequestWith(requestParamId);
        Response mockResponse = mockResponse();

        try {
            String responseJson = (String) route.handle(mockRequest, mockResponse);

            assertDoesNotThrow(() -> new Gson().fromJson(responseJson, FileDto.class),
                    "Response body is not a JSON of uploaded file, but it should have been.");

            assertWithMessage("Response status is incorrect.")
                    .that(mockResponse.status())
                    .isEqualTo(200);

        } catch (Exception e) {
            assertWithMessage("Failed to parse request.").fail();
        }
    }

    @DisplayName("return 'Not Found' error if destination folder is not found.")
    @Test
    void testUploadRequestToNotExistingFolder() {
        UserId expectedUserId = new UserId("qwerwer");
        CurrentUserIdHolder.set(expectedUserId);

        FolderMetadataStorage mockFolderStorage = mockFolderMetadataStorageWith(null);

        FileUploadRoute route = new FileUploadRoute(new FileMetadataStorage(), new FileContentStorage(), mockFolderStorage);

        Request mockRequest = mockRequestWith("ssdfsdfs");
        Response mockResponse = mockResponse();

        try {
            route.handle(mockRequest, mockResponse);

            assertWithMessage("Response status is incorrect.")
                    .that(mockResponse.status())
                    .isEqualTo(404);

        } catch (Exception e) {
            assertWithMessage("Failed to parse request.").fail();
        }
    }
}


