package io.javaclasses.filehub.storage.item.folder;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.RecordId;

/**
 * An identifier for {@link FolderMetadataRecord}.
 */
@Immutable
public final class FolderId extends RecordId {

    /**
     * Creates new {@link FolderId} instance.
     *
     * @param value folder identifier value.
     */
    public FolderId(String value) {
        super(value);
    }
}
