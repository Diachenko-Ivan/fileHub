package io.javaclasses.filehub.storage.item.folder;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.RecordId;
import io.javaclasses.filehub.storage.user.TokenId;

/**
 * Identifier for {@link FolderMetadataRecord}.
 */
@Immutable
public final class FolderId extends RecordId {

    /**
     * Creates new {@link TokenId} instance.
     *
     * @param value folder identifier value.
     */
    public FolderId(String value) {
        super(value);
    }
}
