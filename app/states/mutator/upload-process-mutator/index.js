import {Mutator} from '../';

/**
 * Used for adding of new folder id to list of uploading folders.
 */
export class UploadProcessMutator extends Mutator {
  /**
   * Creates new {@type UploadProcessMutator} instance.
   *
   * @param {string} uploadingFolderId - id of folder in which upload is happening.
   */
  constructor(uploadingFolderId) {
    super();
    this.uploadingFolderId = uploadingFolderId;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.uploadingFolderIds = state.uploadingFolderIds.add(this.uploadingFolderId);
  }
}
