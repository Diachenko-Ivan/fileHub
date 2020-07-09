package io.javaclasses.filehub.api.item.folder;

import java.util.Set;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The generator for a new folder name.
 */
public class NewFolderNameGenerator {

    /**
     * Generates a unique new folder name from the set of {@code existingNames}.
     *
     * @param existingNames the set of existing folder names.
     * @return generated folder name.
     */
    public static synchronized String generateName(Set<String> existingNames) {
        long counter = 0;
        int numberOfFolders = checkNotNull(existingNames).size();

        String newFolderName = "";

        while (counter <= numberOfFolders) {
            String possibleFolderName = "New Folder" + '(' + counter + ')';
            if (!existingNames.contains(possibleFolderName)) {
                newFolderName = possibleFolderName;
                break;
            }
            counter++;
        }
        return newFolderName;
    }
}
