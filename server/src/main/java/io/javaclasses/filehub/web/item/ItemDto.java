package io.javaclasses.filehub.web.item;

import java.util.Objects;

/**
 * Represents either folder or file.
 */
public abstract class ItemDto {
    /**
     * Item id.
     */
    protected String id;
    /**
     * Item name.
     */
    protected String name;
    /**
     * Id of parent folder.
     */
    protected String parentId;
    /**
     * Default folder type.
     */
    protected String type;

    /**
     * Creates new {@link ItemDto} instance.
     *
     * @param id       item id.
     * @param name     item name.
     * @param parentId id of parent folder.
     */
    public ItemDto(String id, String name, String parentId) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
    }

    public String id() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String name() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String parentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemDto itemDto = (ItemDto) o;
        return Objects.equals(id, itemDto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
