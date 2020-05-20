import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class DownloadedFileMutator extends Mutator {
  /**
   * Creates new {@type DownloadedFileMutator} instance.
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
    state.downloadedFileObject = this.fileObject;
  }
}
