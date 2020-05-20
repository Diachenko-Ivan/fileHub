import {Mutator} from '../';
import {FolderModel} from '../../../models/item/folder';
import {FileModel} from '../../../models/item/file';

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

