import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class FileListMutator extends Mutator {
  /**
   * Creates new {@type FileListMutator} instance.
   *
   * @param {Boolean} fileList - list of files and folders from server.
   */
  constructor(fileList) {
    super();
    this.fileList = fileList;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.fileList = this.fileList;
  }
}
