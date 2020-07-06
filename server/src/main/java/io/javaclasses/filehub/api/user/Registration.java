package io.javaclasses.filehub.api.user;

import io.javaclasses.filehub.api.Process;
import io.javaclasses.filehub.storage.item.ItemName;
import io.javaclasses.filehub.storage.item.folder.FileItemCount;
import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataStorage;
import io.javaclasses.filehub.storage.user.User;
import io.javaclasses.filehub.storage.user.UserId;
import io.javaclasses.filehub.storage.user.UserStorage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.IdGenerator.generateId;
import static io.javaclasses.filehub.api.user.PasswordHasher.hash;

/**
 * Represents registration process that can handle {@link RegisterUser} command.
 */
public class Registration implements Process {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(Registration.class);
    /**
     * The name of root folder for each registered user {@link User}.
     */
    private static final String ROOT_FOLDER_NAME = "Root";
    /**
     * Storage for users {@link User}.
     */
    private final UserStorage userStorage;
    /**
     * Storage for folders {@link FolderMetadataRecord}
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * Creates new {@link Registration} process instance.
     *
     * @param userStorage {@link UserStorage} instance.
     */
    public Registration(UserStorage userStorage, FolderMetadataStorage folderMetadataStorage) {
        this.userStorage = checkNotNull(userStorage);
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
    }

    /**
     * Registers new user in application.
     *
     * @param registerUser value object that contains user credentials for registration.
     * @throws LoginIsTakenException if user with this login already exists.
     */
    public void register(RegisterUser registerUser) throws LoginIsTakenException {
        checkNotNull(registerUser);
        String hashedPassword = hash(registerUser.password().value());

        if (userStorage.find(registerUser.login()).isPresent()) {
            if (logger.isInfoEnabled()) {
                logger.info("Unsuccessful registration. Login " + registerUser.login().value() + " is already taken.");
            }
            throw new LoginIsTakenException("User with this login already exists.");
        }
        User userForRegistration = new User(
                new UserId(generateId()), registerUser.login(), hashedPassword);

        userStorage.add(userForRegistration);

        FolderMetadataRecord rootFolder = new FolderMetadataRecord(
                new FolderId(generateId()),
                new ItemName(ROOT_FOLDER_NAME),
                userForRegistration.id(),
                new FileItemCount(0),
                null
        );

        folderMetadataStorage.add(rootFolder);
        if (logger.isInfoEnabled()) {
            logger.info("User with login {}  is registered. Root folder id: {}",
                    userForRegistration.login().value(), rootFolder.id());
        }
    }
}
