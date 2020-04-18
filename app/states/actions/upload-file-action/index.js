import {Action} from '../';
import {GetFolderAction} from '../file-list-action';
import {FileListLoadErrorMutator} from '../../mutator/file-list-load-error-mutator';

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
    try {
      const response = await apiService.uploadFile(this.folderId, this.file);
      await stateManager.dispatch(new GetFolderAction(stateManager.state.currentFolder.id));
      return response;
    } catch (e) {
      stateManager.mutate(new FileListLoadErrorMutator(e));
      return e;
    }
  }
}
