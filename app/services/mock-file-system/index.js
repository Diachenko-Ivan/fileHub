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
    const file = this._files.find((file) => file.id === id);
    return file ? file : undefined;
  }

  /**
   * Returns folder by its id.
   *
   * @param {string} id - folder id.
   * @return {FolderItem} folder.
   */
  getFolder(id) {
    const folder = this._folders.find((folder) => folder.id === id);
    return folder ? folder : undefined;
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
   * @param {FolderItem} renamedFolder - renamed folder sent by user.
   */
  renameFolder(id, renamedFolder) {
    this._folders.forEach((folder) => {
      if (id === folder.id) {
        folder.name = renamedFolder.name;
      }
    });
  }

  /**
   *
   * @param {string} id - file id.
   * @param {FileItem} renamedFile - renamed file sent by user.
   */
  renameFile(id, renamedFile){
    this._files.forEach((file) => {
      if (id === file.id) {
        file.name = renamedFile.name;
      }
    });
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
}
