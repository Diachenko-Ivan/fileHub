import {Action} from '../index.js';
import {GetFolderContentAction} from '../get-folder-content-action/index.js';
import {UploadProcessMutator} from '../../mutator/upload-process-mutator/index.js';
import {UploadFinishedMutator} from '../../mutator/upload-finished-mutator/index.js';
import {UploadErrorMutator} from '../../mutator/upload-error-mutator/index.js';
import {AuthenticationError} from '../../../models/errors/authentication-error/index.js';

/**
 * Action that is responsible for uploading file.
 */
export class UploadFileAction extends Action {
  /**
   * Creates new {@type UploadFileAction} instance.
   *
   * @param {FolderModel} model - folder model.
   * @param {File} file - user`s uploaded file.
   */
  constructor(model, file) {
    super();
    this.model = model;
    this.file = file;
  }

  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    let possibleError;
    const folderId = this.model.id;
    stateManager.mutate(new UploadProcessMutator(folderId));
    try {
      return await apiService.uploadFile(folderId, this.file);
    } catch (error) {
      possibleError = error;
      stateManager.mutate(new UploadErrorMutator({error, model: this.model}));
    } finally {
      const currentFolderId = stateManager.state.currentFolder.id;
      stateManager.mutate(new UploadFinishedMutator(folderId));
      if (currentFolderId === folderId &&
        !(possibleError && possibleError instanceof AuthenticationError)) {
        await stateManager.dispatch(new GetFolderContentAction(currentFolderId));
      }
    }
  }
}
