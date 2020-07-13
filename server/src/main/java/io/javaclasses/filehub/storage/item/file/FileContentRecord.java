package io.javaclasses.filehub.storage.item.file;

import io.javaclasses.filehub.storage.Record;

import java.io.InputStream;


public final class FileContentRecord extends Record<FileId> {
    private final InputStream content;

    public FileContentRecord(FileId id, InputStream content) {
        super(id);
        this.content = content;
    }

    public InputStream content() {
        return content;
    }
}
