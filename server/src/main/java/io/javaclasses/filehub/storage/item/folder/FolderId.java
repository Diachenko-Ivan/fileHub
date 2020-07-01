package io.javaclasses.filehub.storage.item.folder;

import io.javaclasses.filehub.storage.RecordId;
import io.javaclasses.filehub.storage.user.TokenId;

/**
 * Identifier for {@link FolderMetadataRecord}.
 */
public class FolderId extends RecordId {

    /**
     * Creates new {@link TokenId} instance.
     *
     * @param value folder identifier value.
     */
    public FolderId(String value) {
        super(value);
    }
}
