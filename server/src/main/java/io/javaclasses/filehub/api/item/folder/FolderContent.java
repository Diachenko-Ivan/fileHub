package io.javaclasses.filehub.api.item.folder;

import com.google.gson.annotations.SerializedName;
import io.javaclasses.filehub.api.item.file.FileDto;
import io.javaclasses.filehub.storage.item.folder.FolderMetadataRecord;

import static com.google.common.base.Preconditions.checkNotNull;
import static java.util.Arrays.stream;
import static java.util.Comparator.comparing;

/**
 * The value object that contains the content of a folder {@link FolderMetadataRecord}.
 * Content means files and folders that belong to a concrete folder.
 * <p>Used for serialization into JSON.</p>
 */
public final class FolderContent {

    /**
     * An array of child files in the folder.
     */
    @SerializedName("folders")
    private final FolderDto[] childFolders;
    /**
     * An array of sub-folders in the folder.
     */
    @SerializedName("files")
    private final FileDto[] childFiles;

    /**
     * Creates new FolderContent instance sorting {@code childFolders} and {@code childFiles}.
     *
     * @param childFolders an array of child files in the folder.
     * @param childFiles   an array of sub-folders.
     */
    public FolderContent(FolderDto[] childFolders, FileDto[] childFiles) {
        checkNotNull(childFolders);
        checkNotNull(childFiles);

        this.childFolders = sortedFolders(childFolders);

        this.childFiles = sortedFiles(childFiles);
    }

    /**
     * Sorts files by their size.
     *
     * @param childFiles files to sort.
     * @return sorted files.
     */
    private FileDto[] sortedFiles(FileDto[] childFiles) {
        return stream(childFiles)
                .sorted(comparing(FileDto::fileName))
                .toArray(FileDto[]::new);
    }

    /**
     * Sorts folders by their names.
     *
     * @param childFolders folders to sort.
     * @return sorted folders.
     */
    private FolderDto[] sortedFolders(FolderDto[] childFolders) {
        return stream(childFolders)
                .sorted(comparing(FolderDto::name))
                .toArray(FolderDto[]::new);
    }

    /**
     * Getter for the array of sub-folders.
     *
     * @return sub-folders.
     */
    public FolderDto[] childFolders() {
        return childFolders;
    }

    /**
     * Getter for the array of child files.
     *
     * @return child files.
     */
    public FileDto[] childFiles() {
        return childFiles;
    }
}
