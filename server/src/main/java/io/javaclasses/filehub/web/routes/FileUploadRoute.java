package io.javaclasses.filehub.web.routes;

import com.google.gson.Gson;
import io.javaclasses.filehub.api.item.file.FileDto;
import io.javaclasses.filehub.api.item.file.FileUploading;
import io.javaclasses.filehub.api.item.file.UploadFile;
import io.javaclasses.filehub.api.item.file.UploadingFileInfo;
import io.javaclasses.filehub.api.item.folder.FolderNotFoundException;
import io.javaclasses.filehub.api.item.folder.ForbiddenAccessToFolderException;
import io.javaclasses.filehub.api.user.CurrentUserIdHolder;
import io.javaclasses.filehub.storage.item.FileSystemItemName;
import io.javaclasses.filehub.storage.item.file.FileContentRecord;
import io.javaclasses.filehub.storage.item.file.FileContentStorage;
import io.javaclasses.filehub.storage.item.file.FileMetadataRecord;
import io.javaclasses.filehub.storage.item.file.FileMetadataStorage;
import io.javaclasses.filehub.storage.item.file.FileSize;
import io.javaclasses.filehub.storage.item.file.MimeType;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import org.slf4j.Logger;
import spark.Request;
import spark.Response;
import spark.Route;

import javax.servlet.ServletException;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;

import static com.google.common.base.Preconditions.checkNotNull;
import static javax.servlet.http.HttpServletResponse.SC_NOT_FOUND;
import static javax.servlet.http.HttpServletResponse.SC_OK;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * The implementation of the {@link Route} that handles requests for file uploading.
 */
public class FileUploadRoute implements Route {
    /**
     * The instance of {@link Logger} for FileUploadRoute class.
     */
    private static final Logger logger = getLogger(FileUploadRoute.class);
    /**
     * The name of the path parameter for the folder identifier.
     */
    private static final String FOLDER_ID_PARAM = "folderId";
    /**
     * The name of the {@link Part} that is received in the upload request body.
     */
    private static final String PART_NAME = "file";
    /**
     * Storage for {@link FileMetadataRecord}.
     */
    private final FileMetadataStorage fileMetadataStorage;
    /**
     * Storage for {@link FileContentRecord}.
     */
    private final FileContentStorage fileContentStorage;
    /**
     * Storage for {@link FolderMetadataRecord}.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * Creates new FileUploadRoute instance.
     *
     * @param fileMetadataStorage   storage for file metadata.
     * @param fileContentStorage    storage for file content.
     * @param folderMetadataStorage storage for folder metadata.
     */
    public FileUploadRoute(FileMetadataStorage fileMetadataStorage,
                           FileContentStorage fileContentStorage,
                           FolderMetadataStorage folderMetadataStorage) {
        this.fileMetadataStorage = checkNotNull(fileMetadataStorage);
        this.fileContentStorage = checkNotNull(fileContentStorage);
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
    }

    /**
     * Handles requests for file uploading.
     * <p>Sets the {@code response} status 200 if file was uploaded in the folder.
     * <p>Sets the {@code response} status 404 if destination folder was not found.
     * {@inheritDoc}
     */
    @Override
    public Object handle(Request request, Response response) throws Exception {
        response.type("application/json");
        try {
            UploadFile command = readCommand(request);

            FileUploading process = createProcess();

            FileDto file = process.handle(command);

            response.status(SC_OK);
            return sendResponseJson(file);
        } catch (FolderNotFoundException | ForbiddenAccessToFolderException e) {

            response.status(SC_NOT_FOUND);
            return "Folder was not found";
        }
    }

    /**
     * Returns new {@link UploadFile} command parsing {@code request} body and path parameters.
     *
     * @param request an object with the information from the request.
     * @return a command to upload the file.
     * @throws IOException      if an I/O error occurred during the retrieval of the requested {@code part}.
     * @throws ServletException if {@code request} type is not {@code multipart/form-data}.
     */
    private static UploadFile readCommand(Request request) throws IOException, ServletException {
        Part part = request.raw().getPart(PART_NAME);
        InputStream inputStream = part.getInputStream();
        if (logger.isInfoEnabled()) {
            logger.info("File with name {} was received from request body.", part.getSubmittedFileName());
        }

        byte[] content = new byte[inputStream.available()];

        inputStream.read(content);

        UploadingFileInfo fileInfo = new UploadingFileInfo(
                new FileSystemItemName(part.getSubmittedFileName()),
                new FileSize(part.getSize()), new MimeType(part.getContentType()), content);

        inputStream.close();
        return new UploadFile(fileInfo, new FolderId(request.params(FOLDER_ID_PARAM)), CurrentUserIdHolder.get());
    }

    /**
     * Returns FileUploading process instance.
     *
     * @return FileUploading process.
     */
    private FileUploading createProcess() {
        return new FileUploading(folderMetadataStorage, fileMetadataStorage, fileContentStorage);
    }

    /**
     * Creates JSON string from {@code file} for response body.
     *
     * @param file the object for serialization into JSON.
     * @return JSON string for response body.
     */
    private static String sendResponseJson(FileDto file) {
        return new Gson().toJson(file);
    }
}
