package io.javaclasses.filehub.web.routes;

import spark.Request;
import spark.Response;
import spark.Route;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletInputStream;
import javax.servlet.http.Part;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileUploadRoute implements Route {

    @Override
    public Object handle(Request request, Response response) throws Exception {
        System.out.println(request.body());
        request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/uploads"));
        ServletInputStream parts = request.raw().getInputStream();
        byte[] buffer = new byte[parts.available()];
        int read = parts.read(buffer);
        String file1 = request.body();
        Part inputStream = request.raw().getPart("file");
//        byte[] buffer = new byte[inputStream.available()];
//        inputStream.read(buffer);
        Path file = new File(inputStream.getSubmittedFileName()).toPath();
        try(FileOutputStream fileOutputStream = new FileOutputStream(file.toFile())){
//            fileOutputStream.write(buffer);
        }
        System.out.println(Files.probeContentType(file));
//        inputStream.close();
        return "null";
    }
}
