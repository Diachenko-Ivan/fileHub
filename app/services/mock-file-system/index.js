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
  _folders = [
    {name: 'Different', type: 'folder', filesCount: 10, id: '123', parentId: 'root'},
    {name: 'Root', type: 'folder', filesCount: 10, id: 'root'},
  ];

  /**
   * Array of files.
   * <p>Used for development.
   *
   * @type {FileItem[]}
   * @private
   */
  _files = [
    {name: 'nature.jpeg', type: 'file', mimeType: 'image', size: 10, id: 'abs', parentId: '123'},
    {name: 'hello.txt', type: 'file', mimeType: 'text', size: 100, id: 'qwe', parentId: '123'},
    {name: 'file.pdf', type: 'file', mimeType: 'text', size: 100, id: 'zxc', parentId: 'root'},
  ];

  /**
   * Deletes folder by its id.
   *
   * @param {string} folderId - id of folder that is going to be deleted.
   */
  deleteFolder(folderId) {
    const childFolders = this._folders.filter((childFolder) => childFolder.parentId === folderId);
    childFolders.forEach((childFolder) => {
      this.deleteFolder(childFolder);
    });

    const files = this._files.filter((file) => file.parentId === folderId);
    files.forEach((file) => {
      const index = this._files.indexOf(file);
      this._files.splice(index, 1);
    });

    const folderIndex = this._folders.indexOf(this.getFolder(folderId));
    this._folders.splice(folderIndex, 1);
  }

  /**
   * Deletes file by its id.
   *
   * @param {string} fileId - id of file that is going to be deleted.
   */
  deleteFile(fileId) {
    const fileToDelete = this._files.find((file) => file.id === fileId);
    const fileIndex = this._files.indexOf(fileToDelete);
    this._files.splice(fileIndex, 1);
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
