package io.javaclasses.filehub.web.routes;

import javax.servlet.http.Part;
import java.io.IOException;
import java.util.Collection;

/**
 * Mock for the {@link Part}.
 */
public abstract class MockPart implements Part {

    @Override
    public String getName() {
        return null;
    }

    @Override
    public void write(String fileName) throws IOException {

    }

    @Override
    public void delete() throws IOException {

    }

    @Override
    public String getHeader(String name) {
        return null;
    }

    @Override
    public Collection<String> getHeaders(String name) {
        return null;
    }

    @Override
    public Collection<String> getHeaderNames() {
        return null;
    }
}
