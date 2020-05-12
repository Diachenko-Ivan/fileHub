import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class UploadFinishedMutator extends Mutator {
  /**
   * Creates new {@type UploadFinishedMutator} instance.
   *
   * @param {string} uploadFinishedFolderId - id of folder where file is already uploaded.
   */
  constructor(uploadFinishedFolderId) {
    super();
    this.uploadFinishedFolderId = uploadFinishedFolderId
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    const uploadingFolderIds = state.uploadingFolderIds;
    const folderIndex = uploadingFolderIds.indexOf(this.uploadFinishedFolderId);
    uploadingFolderIds.splice(folderIndex, 1);
    state.uploadingFolderIds = uploadingFolderIds;
  }
}
