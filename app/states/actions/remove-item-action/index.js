import {Action} from '../';
import {GetFolderContentAction} from '../get-folder-content-action';
import {RemovingItemsMutator} from '../../mutator/remove-items-mutator';
import {RemoveItemErrorMutator} from '../../mutator/remove-item-error-mutator';
import {RemovedItemsMutator} from '../../mutator/remove-finished-item-mutator';

/**
 * Action that is responsible for removing item.
 */
export class RemoveItemAction extends Action {
  /**
   * Creates new {@type RemoveItemAction} instance.
   *
   * @param {FileDescription | FolderDescription} model - model of item that is being removed.
   */
  constructor(model) {
    super();
    this.model = model;
  }
  
  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    const model = this.model;
    if (!stateManager.state.removingItemIds.includes(model.id)) {
      stateManager.mutate(new RemovingItemsMutator(model.id));
      try {
        if (model.type === 'folder') {
          await apiService.removeFolder(model.id);
        } else {
          await apiService.removeFile(model.id);
        }
      } catch (e) {
        stateManager.mutate(new RemoveItemErrorMutator(e));
      } finally {
        stateManager.mutate(new RemovedItemsMutator(model.id));
        await stateManager.dispatch(new GetFolderContentAction(stateManager.state.currentFolder.id));
      }
    }
  }
}
