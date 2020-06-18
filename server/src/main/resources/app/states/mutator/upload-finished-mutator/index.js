import {Mutator} from '../index.js';

/**
 * Used for removing of  folder id from list of uploading folders.
 */
export class UploadFinishedMutator extends Mutator {
  /**
   * Creates new {@type UploadFinishedMutator} instance.
   *
   * @param {string} uploadFinishedFolderId - id of folder where file is already uploaded.
   */
  constructor(uploadFinishedFolderId) {
    super();
    this.uploadFinishedFolderId = uploadFinishedFolderId;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.uploadingFolderIds = new Set(
      Array.from(state.uploadingFolderIds)
        .filter((id) => id !== this.uploadFinishedFolderId),
    );
  }
}
