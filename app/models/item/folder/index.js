import {AbstractItemModel} from '../';

/**
 * Represents folder.
 */
export class FolderModel extends AbstractItemModel {
  /**
   * @typedef FolderDescription
   * @property {string} name - name of folder.
   * @property {number} filesCount - number of files in folder.
   * @property {string} id - folder id.
   * @property {string} parentId - id of parent folder.
   * @property {string} type - folder.
   */
  /**
   * File type.
   * @type {string}
   */
  type = 'folder';
  /**
   * Number of file items in folder.
   * @type {number}
   */
  filesCount;
  
  /**
   * Creates {@link FolderModel} instance.
   *
   * @param {FolderDescription} folderDescription - folder properties.
   */
  constructor(folderDescription) {
    super();
    Object.assign(this, folderDescription);
  }
}
