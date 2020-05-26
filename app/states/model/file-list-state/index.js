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
   * List of folder ids where upload is happening.
   * @type {Set<string>}
   */
  uploadingFolderIds = new Set();
  /**
   * Error in the result of upload.
   * @type {{model: FolderModel, error: Error}}
   */
  uploadErrorObject;
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
   * Contains ids of items that are being renamed.
   * @type {Set<string>}
   */
  renamingItemIds = new Set();
  /**
   * @typedef ErrorObject
   * @property {AbstractItemModel} model - item model.
   * @property {Error} error - error.
   */
  /**
   * Contains error in the result of rename.
   *
   * @type {ErrorObject}
   */
  renameErrorObject;
  /**
   * Contains set of downloading file ids.
   *
   * @type {Set<string>}
   */
  downloadingFileIds = new Set();
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
  /**
   * Contains model of folder where new folder is being created in.
   *
   * @type {FolderModel}
   */
  newFolderSource;
  /**
   * Contains id of new created folder.
   *
   * @type {string}
   */
  newFolderId;
  /**
   * Error in the result of folder creation.
   *
   * @type {Error}
   */
  createFolderError;
}
