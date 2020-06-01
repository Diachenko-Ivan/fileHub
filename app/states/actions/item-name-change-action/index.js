import {Action} from '../index.js';
import {GetFolderContentAction} from '../get-folder-content-action';
import {RenamingItemsMutator} from '../../mutator/rename-process-mutator';
import {RenamedItemsMutator} from '../../mutator/rename-finished-mutator';
import {RenameErrorMutator} from '../../mutator/rename-error-mutator';
import {AuthenticationError} from '../../../models/errors/authentication-error';

/**
 * Action that is responsible for renaming item.
 */
export class RenameItemAction extends Action {
  /**
   * Creates new {@type RenameItemAction} instance.
   *
   * @param {AbstractItemModel} model - renaming item model.
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
    stateManager.mutate(new RenamingItemsMutator(model.id));
    try {
      await apiService.renameItem(model);
    } catch (error) {
      possibleError = error;
      stateManager.mutate(new RenameErrorMutator({model, error}));
    } finally {
      stateManager.mutate(new RenamedItemsMutator(model.id));
      const currentFolderId = stateManager.state.currentFolder.id;
      if (initialFolderId === currentFolderId
        && !(possibleError && possibleError instanceof AuthenticationError)) {
        await stateManager.dispatch(new GetFolderContentAction(currentFolderId));
      }
    }
  }
}
