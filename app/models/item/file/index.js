import {AbstractItemModel} from '../';

/**
 * Represents file.
 */
export class FileModel extends AbstractItemModel {
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
