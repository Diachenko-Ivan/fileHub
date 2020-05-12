import {Action} from '../';
import {GetFolderContentAction} from '../get-folder-content-action';
import {UploadProcessMutator} from '../../mutator/upload-process-mutator';
import {UploadFinishedMutator} from '../../mutator/upload-finished-mutator';
import {UploadErrorMutator} from '../../mutator/upload-error-mutator';

/**
 * Action that is responsible for uploading file.
 */
export class UploadFileAction extends Action {
  /**
   * Creates new {@type UploadFileAction} instance.
   *
   * @param {string} folderId - folder id.
   * @param {File} file - user`s uploaded file.
   */
  constructor(folderId, file) {
    super();
    this.folderId = folderId;
    this.file = file;
  }

  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    const folderId = this.folderId;
    stateManager.mutate(new UploadProcessMutator(folderId));
    try {
      return await apiService.uploadFile(folderId, this.file);
    } catch (e) {
      stateManager.mutate(new UploadErrorMutator(e));
    } finally {
      stateManager.mutate(new UploadFinishedMutator(folderId));
      await stateManager.dispatch(new GetFolderContentAction(stateManager.state.currentFolder.id));
    }
  }
}
