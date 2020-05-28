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
   * Used as number for new folder.
   * @type {number}
   * @private
   */
  _counter = 0;
  
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
   * Renames folder with specific id.
   *
   * @param {string} id - folder id.
   * @param {FolderModel} renamedFolder - renamed folder sent by user.
   */
  renameFolder(id, renamedFolder) {
    this._folders.forEach((folder) => {
      if (id === folder.id) {
        folder.name = renamedFolder.name;
      }
    });
  }
  
  /**
   * Renames file with specific id.
   *
   * @param {string} id - file id.
   * @param {FileModel} renamedFile - renamed file sent by user.
   */
  renameFile(id, renamedFile) {
    this._files.forEach((file) => {
      if (id === file.id) {
        file.name = renamedFile.name;
      }
    });
  }
  
  /**
   * Saves new file to file system.
   *
   * @param {File} file - uploading file.
   * @param {string} folderId - id of folder where file is saved.
   * @return {FileDescription} file object model.
   */
  saveFile(file, folderId) {
    const fileId = Math.random().toString();
    const fileItem = {
      name: file.name,
      id: fileId,
      mimeType: file.type,
      parentId: folderId,
      size: file.size,
      type: 'file',
    };
    this._files.push(fileItem);
    this._fileObjects.push({file, id: fileId});
    return fileItem;
  }
  
  /**
   * Creates new folder.
   *
   * @param {string} id - parent id for new folder.
   */
  createFolder(id) {
    const folder = {
      name: `New folder ${++this._counter}`,
      filesCount: 0,
      parentId: id,
      id: Math.random().toString(),
      type: 'folder',
    };
    this._folders.push(folder);
    return folder;
  }
}
