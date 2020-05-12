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
   * List of folder ids where upload is happening.
   * @type {string[]}
   */
  uploadingFolderIds = [];
  /**
   * Error in the result of upload.
   * @type {Error}
   */
  uploadError;
}
