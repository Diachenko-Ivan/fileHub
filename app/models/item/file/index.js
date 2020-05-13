import {AbstractItemModel} from '../';

/**
 * Represents file.
 */
export class FileModel extends AbstractItemModel {
  /**
   * @typedef FileDescription
   * @property {string} name - name of file.
   * @property {number} size - file size.
   * @property {string} mimeType - image, video, document.
   * @property {string} id - file id.
   * @property {string} parentId - id of parent folder.
   * @property {string} type - folder.
   */
  /**
   * File type.
   * @type {string}
   */
  type = 'file';
  /**
   * File size.
   * @type {number}
   */
  size;
  /**
   * File mime type.
   * @type {string}
   */
  mimeType;
  
  /**
   * Creates {@link FileModel} instance.
   *
   * @param {FileDescription} fileDescription - file properties.
   */
  constructor(fileDescription) {
    super();
    Object.assign(this, fileDescription);
  }
}
