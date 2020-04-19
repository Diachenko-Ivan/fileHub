import {FileListLoadingMutator} from '../../mutator/file-list-loading-mutator';
import {Action} from '../index.js';
import {FileListLoadErrorMutator} from '../../mutator/file-list-load-error-mutator';
import {FileListMutator} from '../../mutator/file-list-mutator';
import {FolderMutator} from '../../mutator/folder-mutator';

/**
 * Action that is responsible for getting file item list.
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
    stateManager.mutate(new FileListLoadingMutator(true));
    try {
      const folderResponse = await apiService.getFolder(this.folderId);
      const folderContentResponse = await apiService.getFolderContent(this.folderId);
      stateManager.mutate(new FolderMutator(folderResponse));
      stateManager.mutate(new FileListMutator(folderContentResponse));
      return [folderResponse, folderContentResponse];
    } catch (e) {
      stateManager.mutate(new FileListLoadErrorMutator(e));
      return e;
    } finally {
      stateManager.mutate(new FileListLoadingMutator(false));
    }
  }
}
