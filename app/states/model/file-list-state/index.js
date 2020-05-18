/**
 * Used for storing file list state.
 */
export class FileListState {
  /**
   * Rendered file list.
   * @type {AbstractItemModel[]}
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
   * @type {FolderModel}
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
   * Currently authorized user.
   * @type {object}
   */
  user;
  /**
   * Error in the result of getting user.
   * @type {Error}
   */
  userError;
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
  /**
   * @typedef DownloadFileObject
   * @property {FileModel} model - model of downloading file.
   * @property {File} file - downloading file.
   */
  /**
   * Current downloading file.
   * @type DownloadFileObject
   */
  downloadingFileObject;
  /**
   * @typedef DownloadErrorObject
   * @property {FileModel} model - model of downloading file.
   * @property {Error} error - error in the result of download.
   */
  /**
   * Error in the result of file download.
   * @type {DownloadErrorObject}
   */
  downloadErrorObject;
}
