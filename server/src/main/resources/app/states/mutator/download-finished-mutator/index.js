import {Mutator} from '../index.js';

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
    this.downloadedFileId = fileId;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.downloadingFileIds = new Set(Array.from(state.downloadingFileIds)
      .filter((id) => id !== this.downloadedFileId));
  }
}
