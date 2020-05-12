import {FileListLoadingMutator} from '../../mutator/file-list-loading-mutator';
import {Action} from '../index.js';
import {FileListLoadErrorMutator} from '../../mutator/file-list-load-error-mutator';
import {FileListMutator} from '../../mutator/file-list-mutator';

/**
 * Action that is responsible for getting folder content.
 */
export class GetFolderContentAction extends Action {
  /**
   * Creates new {@type GetFolderContentAction} instance.
   *
   * @param {string} folderId - id of folder.
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
      const folderContentResponse = await apiService.getFolderContent(this.folderId);
      stateManager.mutate(new FileListMutator(folderContentResponse));
      return folderContentResponse;
    } catch (e) {
      stateManager.mutate(new FileListLoadErrorMutator(e));
    } finally {
      stateManager.mutate(new FileListLoadingMutator(false));
    }
  }
}
