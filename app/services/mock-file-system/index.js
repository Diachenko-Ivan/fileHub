/**
 * Used for mock server requests.
 */
export class MockFileSystem {
  /**
   * Array of folders.
   * <p>Used for development.
   *
   * @type {FolderDescription[]}
   * @private
   */
  _folders = [];
  
  /**
   * Array of files.
   * <p>Used for development.
   *
   * @type {FileDescription[]}
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
   * @param {FolderDescription[]} folders - array of folders.
   * @param {FileDescription[]} files - array of files.
   */
  constructor(folders, files) {
    this._folders = folders;
    this._files = files;
  }
  /**
   * Recursively deletes folder by its id.
   *
   * @param {string} folderId - id of folder that is going to be deleted.
   */
  deleteFolder(folderId) {
    const childFolders = this._folders.filter((childFolder) => childFolder.parentId === folderId);
    childFolders.forEach((childFolder) => {
      this.deleteFolder(childFolder);
    });
    
    this._files = this._files.filter((file) => file.parentId !== folderId);
    
    this._folders = this._folders.filter((folder) => folder.id !== folderId);
  }
  
  /**
   * Deletes file by its id.
   *
   * @param {string} fileId - id of file that is going to be deleted.
   */
  deleteFile(fileId) {
    this._files = this._files.filter((file) => file.id !== fileId);
  }
  
  /**
   * Returns file by its id.
   *
   * @param {string} id - file id.
   * @return {FileDescription} file.
   */
  getFile(id) {
    return this._files.find((file) => file.id === id);
  }
  
  /**
   * Returns folder by its id.
   *
   * @param {string} id - folder id.
   * @return {FolderDescription} folder.
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
   * @return {FileModel} file object model.
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
}
