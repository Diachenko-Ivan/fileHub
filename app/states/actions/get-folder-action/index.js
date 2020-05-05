import {Action} from '../';
import {FolderMutator} from '../../mutator/folder-mutator';
import {FolderLoadingMutator} from '../../mutator/folder-loading-mutator';
import {FolderLoadErrorMutator} from '../../mutator/folder-load-error-mutator';

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
    stateManager.mutate(new FolderLoadingMutator(true));
    try {
      const folderResponse = await apiService.getFolder(this.folderId);
      stateManager.mutate(new FolderMutator(folderResponse));
      return folderResponse;
    } catch (e) {
      stateManager.mutate(new FolderLoadErrorMutator(e));
    } finally {
      stateManager.mutate(new FolderLoadingMutator(false));
    }
  }
}
