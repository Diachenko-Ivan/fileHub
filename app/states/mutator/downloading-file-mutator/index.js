import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class DownloadingFileMutator extends Mutator {
  /**
   * Creates new {@type DownloadingFileMutator} instance.
   *
   * @param {DownloadFileObject} fileObject - model of downloading file.
   */
  constructor(fileObject) {
    super();
    this.fileObject = fileObject;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.downloadingFileObject = this.fileObject;
  }
}
