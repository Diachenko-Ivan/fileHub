import {Action} from '../';
import {FileListLoadErrorMutator} from '../../mutator/file-list-load-error-mutator';
import {GetFolderContentAction} from '../get-folder-content-action';
import {RemoveProgressMutator} from '../../mutator/remove-progress-mutator';

/**
 * Action that is responsible for getting file item list.
 */
export class RemoveItemAction extends Action {
  /**
   * Creates new {@type GetFolderAction} instance.
   *
   * @param {Item} model - id of folder which is going to be requested from server.
   */
  constructor(model) {
    super();
    this.model = model;
  }
  
  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    stateManager.mutate(new RemoveProgressMutator(true));
    try {
      if (this.model.type === 'folder') {
        await apiService.removeFolder(this.model.id);
      } else {
        await apiService.removeFile(this.model.id);
      }
      await stateManager.dispatch(new GetFolderContentAction(stateManager.state.currentFolder.id));
    } catch (e) {
      stateManager.mutate(new FileListLoadErrorMutator(e));
    } finally {
      stateManager.mutate(new RemoveProgressMutator(false));
    }
  }
}
