import {Mutator} from '../index.js';
import {FolderModel} from '../../../models/item/folder/index.js';
import {FileModel} from '../../../models/item/file/index.js';

/**
 * @inheritdoc
 */
export class FileListMutator extends Mutator {
  /**
   * Creates new {@type FileListMutator} instance.
   *
   * @param {FolderDescription | FileDescription []} fileList - list of files and folders from server.
   */
  constructor(fileList) {
    super();
    this.fileList = fileList;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.fileList = this.fileList.map((item) => item.type === 'folder' ? new FolderModel(item) : new FileModel(item));
  }
}

