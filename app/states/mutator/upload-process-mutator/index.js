import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class UploadProcessMutator extends Mutator {
  /**
   * Creates new {@type UploadProcessMutator} instance.
   *
   * @param {string} uploadingFolderIds - flag
   */
  constructor(uploadingFolderIds) {
    super();
    this.uploadingFolderId = uploadingFolderIds
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    const uploadingFolderIds = state.uploadingFolderIds;
    uploadingFolderIds.push(this.uploadingFolderId);
    state.uploadingFolderIds = uploadingFolderIds;
  }
}
