package io.javaclasses.filehub.storage.user;

/**
 * Used for serialization into JSON and sending in response.
 */
public class UserDto {
    private String id;
    private String name;

    public UserDto(String id, String name) {
        this.id = id;
        this.name = name;
    }
}