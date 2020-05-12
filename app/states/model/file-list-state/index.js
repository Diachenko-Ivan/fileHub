/**
 * Used for storing file list state.
 */
export class FileListState {
  /**
   * Rendered file list.
   * @type {*[]}
   */
  fileList = [];
  /**
   * Defines that file list is loading or not.
   * @type {boolean}
   */
  isLoading;
  /**
   * Error that can be raised in getting of folder content.
   * @type {Error}
   */
  loadError;
  /**
   * Stores dynamic hash params.
   * @type {object}
   */
  locationParam;
  /**
   * Current hash value.
   * @type {string}
   */
  location;
  /**
   * Current open folder.
   * @type {FolderDescription}
   */
  currentFolder;
  /**
   * Defines that folder is loading or not.
   * @type {boolean}
   */
  isFolderLoading;
  /**
   * Error that can be raised in getting of folder content.
   * @type {Error}
   */
  folderLoadError;
  /**
   * Contains ids of items that are being deleted.
   * @type {string[]}
   */
  removingItemIds = [];
  /**
   * Error that is raised in the result of item deletion.
   * @type {Error}
   */
  removeError;
}
