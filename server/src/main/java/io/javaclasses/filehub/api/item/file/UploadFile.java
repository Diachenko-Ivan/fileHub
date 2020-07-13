package io.javaclasses.filehub.api.item.file;

import io.javaclasses.filehub.storage.item.folder.FolderId;
import io.javaclasses.filehub.storage.user.UserId;

import java.io.InputStream;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 *
 */
public final class UploadFile {
    private final InputStream content;
    private final FolderId parentFolderId;
    private final UserId ownerId;

    public UploadFile(InputStream content, FolderId parentFolderId, UserId ownerId) {
        this.content = checkNotNull(content);
        this.parentFolderId = checkNotNull(parentFolderId);
        this.ownerId = checkNotNull(ownerId);
    }

    public InputStream content() {
        return content;
    }

    public FolderId parentFolderId() {
        return parentFolderId;
    }

    public UserId ownerId() {
        return ownerId;
    }
}
