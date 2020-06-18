import {Action} from '../index.js';
import {GetFolderContentAction} from '../get-folder-content-action/index.js';
import {RemovingItemsMutator} from '../../mutator/remove-items-mutator/index.js';
import {RemoveItemErrorMutator} from '../../mutator/remove-item-error-mutator/index.js';
import {RemovedItemsMutator} from '../../mutator/remove-finished-item-mutator/index.js';
import {AuthenticationError} from '../../../models/errors/authentication-error/index.js';

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
    const initialFolderId = stateManager.state.currentFolder.id;
    let possibleError;
    const model = this.model;
    stateManager.mutate(new RemovingItemsMutator(model.id));
    try {
      if (model.type === 'folder') {
        await apiService.removeFolder(model.id);
      } else {
        await apiService.removeFile(model.id);
      }
    } catch (e) {
      possibleError = e;
      stateManager.mutate(new RemoveItemErrorMutator(e));
    } finally {
      stateManager.mutate(new RemovedItemsMutator(model.id));
      const currentFolderId = stateManager.state.currentFolder.id;
      if (initialFolderId === currentFolderId &&
        !(possibleError && possibleError instanceof AuthenticationError)) {
        await stateManager.dispatch(new GetFolderContentAction(currentFolderId));
      }
    }
  }
}
