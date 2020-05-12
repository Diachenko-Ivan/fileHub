/**
 * Represents abstract file item(file or folder).
 */
export class AbstractItemModel {
  /**
   * Item id.
   * @type {string}
   */
  id;
  /**
   * Item name.
   * @type {string}
   */
  name;
  /**
   * Item type.
   * @type {string}
   */
  type;
  /**
   * Id of parent folder.
   * @type {string}
   */
  parentId;
}
