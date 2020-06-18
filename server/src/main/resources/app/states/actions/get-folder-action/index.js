import {Action} from '../index.js';
import {FolderMutator} from '../../mutator/folder-mutator/index.js';
import {FolderLoadingMutator} from '../../mutator/folder-loading-mutator/index.js';
import {FolderLoadErrorMutator} from '../../mutator/folder-load-error-mutator/index.js';

/**
 * Action that is responsible for getting folder.
 */
export class GetFolderAction extends Action {
  /**
   * Creates new {@type GetFolderAction} instance.
   *
   * @param {string} folderId - id of folder which is going to be requested from server.
   */
  constructor(folderId) {
    super();
    this.folderId = folderId;
  }

  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    let possibleError;
    let folderResponse;
    stateManager.mutate(new FolderLoadingMutator(true));
    try {
      folderResponse = await apiService.getFolder(this.folderId);
    } catch (e) {
      possibleError = e;
      stateManager.mutate(new FolderLoadErrorMutator(e));
    } finally {
      stateManager.mutate(new FolderLoadingMutator(false));
      if (!possibleError) {
        stateManager.mutate(new FolderMutator(folderResponse));
      }
    }
  }
}
