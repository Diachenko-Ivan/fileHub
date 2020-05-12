/**
 * Used for mock server requests.
 */
export class MockFileSystem {
  /**
   * @typedef FolderItem
   * @property {string} name - folder name.
   * @property {number} filesCount - number of file in folder.
   * @property {string} id - id of current folder.
   * @property {string} parentId - id of parent folder.
   * @property {string} type - folder.
   */
  /**
   * @typedef FileItem
   * @property {string} name - file name.
   * @property {number} size - file size.
   * @property {string} id - id of current file.
   * @property {string} parentId - id of parent folder.
   * @property {string} type - file.
   * @property {string} mimeType - image, text, audio or video.
   */
  /**
   * Array of folders.
   * <p>Used for development.
   *
   * @type {FolderItem[]}
   * @private
   */
  _folders = [];
  
  /**
   * Array of files.
   * <p>Used for development.
   *
   * @type {FileItem[]}
   * @private
   */
  _files = [];
  
  /**
   * @typedef FileObject
   * @property {string} id - file id.
   * @property {File} file - file.
   */
  /**
   * Stores files with its id.
   *
   * @type {FileObject[]}
   */
  _fileObjects = [];
  /**
   * Creates new mock file system with available files and folders.
   *
   * @param {FolderItem[]} folders - array of folders.
   * @param {FileItem[]} files - array of files.
   */
  constructor(folders, files) {
    this._folders = folders;
    this._files = files;
  }
  /**
   * Returns file by its id.
   *
   * @param {string} id - file id.
   * @return {FileItem} file.
   */
  getFile(id) {
    return this._files.find((file) => file.id === id);
  }
  
  /**
   * Returns folder by its id.
   *
   * @param {string} id - folder id.
   * @return {FolderItem} folder.
   */
  getFolder(id) {
    return this._folders.find((folder) => folder.id === id);
  }
  
  /**
   * Returns folder content by its id.
   *
   * @param {string} id - folder id.
   * @return {[]} array of files and folders.
   */
  getFolderContent(id) {
    const folders = this._folders.filter((folder) => folder.parentId === id);
    const files = this._files.filter((file) => file.parentId === id);
    return folders.concat(files);
  }

  /**
   * Saves new file to file system.
   *
   * @param {File} file - uploading file.
   * @param {string} folderId - id of folder where file is saved.
   * @return {FileItem} file object model.
   */
  saveFile(file, folderId) {
    const fileId = Math.random().toString();
    const fileItem = {
      name: file.name,
      id: fileId,
      mimeType: file.type,
      parentId: folderId,
      size: file.size,
      type: 'file'
    };
    this._files.push(fileItem);
    this._fileObjects.push({file, id: fileId});
    return fileItem;
  }
  
  /**
   * Used for tests.
   *
   * @return {FileItem[]}
   */
  getFiles() {
    return this._files;
  }
  
  /**
   * Used for tests.
   *
   * @return {FolderItem[]}
   */
  getFolders() {
    return this._folders;
  }

  /**
   * Used for tests.
   *
   * @return {FileObject[]}
   */
  getFileObjects() {
    return this._fileObjects;
  }
}
