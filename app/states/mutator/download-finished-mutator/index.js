import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class DownloadFinishedMutator extends Mutator {
  /**
   * Creates new {@type DownloadFinishedMutator} instance.
   *
   * @param {string} fileId - model of downloading file.
   */
  constructor(fileId) {
    super();
    this.downloadingFileId = fileId;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.downloadingFileIds = new Set(Array.from(state.downloadingFileIds).filter((id) => id !== this.downloadingFileId));
  }
}
