import {AbstractItemModel} from '../';

/**
 * Represents folder.
 */
export class FolderModel extends AbstractItemModel {
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
