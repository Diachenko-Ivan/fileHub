import {Action} from '../index.js';
import {FileListLoadErrorMutator} from '../../mutator/file-list-load-error-mutator';
import {GetFolderContentAction} from '../get-folder-content-action';
import {EditingItemMutator} from '../../mutator/editing-item-mutator';
import {RenamingItemMutator} from '../../mutator/renaming-item-mutator';

/**
 * Action that is responsible for renaming item.
 */
export class RenameItemAction extends Action {
  /**
   * Creates new {@type GetFolderAction} instance.
   *
   * @param {AbstractItemModel} model - id of folder which is going to be requested from server.
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
    stateManager.mutate(new EditingItemMutator(null));
    stateManager.mutate(new RenamingItemMutator(model.id));
    try {
      await apiService.renameItem(model);
    } catch (e) {
      stateManager.mutate(new FileListLoadErrorMutator(e));
    } finally {
      stateManager.mutate(new RenamingItemMutator(null));
      await stateManager.dispatch(new GetFolderContentAction(stateManager.state.currentFolder.id));
    }
  }
}
