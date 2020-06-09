package io.javaclasses.filehub.web.item.file;

import java.io.FileNotFoundException;

/**
 * Used for file renaming.
 */
public interface RenameFileService {
    /**
     * Renames file depending on its id.
     *
     * @param fileDto DTO of renamed file.
     * @return DTO of renamed file.
     * @throws FileNotFoundException if file with id that is equal to {@code fileDto.id} is not found.
     */
    FileDto rename(FileDto fileDto) throws FileNotFoundException;
}
