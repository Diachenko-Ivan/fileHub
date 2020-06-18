import {Mutator} from '../index.js';

/**
 * @inheritdoc
 */
export class DownloadProcessMutator extends Mutator {
  /**
   * Creates new {@type DownloadProcessMutator} instance.
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
    state.downloadingFileIds = new Set([...state.downloadingFileIds, this.downloadingFileId]);
  }
}
