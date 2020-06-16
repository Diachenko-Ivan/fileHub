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
     * Item type.
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

    /**
     * Used for getting of item`s id.
     *
     * @return item id.
     */
    public String id() {
        return id;
    }

    /**
     * Sets item`s new id.
     *
     * @param id item`s new id.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Used for getting of item`s name.
     *
     * @return item`s name.
     */
    public String name() {
        return name;
    }

    /**
     * Sets item`s new name.
     *
     * @param name item`s new name.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Used for getting of item`s parent folder id.
     *
     * @return id of parent folder.
     */
    public String parentId() {
        return parentId;
    }

    /**
     * Sets new item`s parent folder id.
     *
     * @param parentId id of parent folder.
     */
    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    /**
     * Compares items by their ids.
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemDto itemDto = (ItemDto) o;
        return Objects.equals(id, itemDto.id);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
