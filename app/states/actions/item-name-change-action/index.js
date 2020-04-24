import {Action} from '../index.js';
import {FileListLoadErrorMutator} from '../../mutator/file-list-load-error-mutator';
import {GetFolderAction} from '../file-list-action';

/**
 * Action that is responsible for renaming item.
 */
export class RenameItemAction extends Action {
  /**
   * Creates new {@type GetFolderAction} instance.
   *
   * @param {FileItem | FolderItem} model - id of folder which is going to be requested from server.
   */
  constructor(model) {
    super();
    this.model = model;
  }

  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    try {
      const itemResponse = await apiService.renameItem(this.model);
      await stateManager.dispatch(new GetFolderAction(stateManager.state.currentFolder.id));
      return itemResponse;
    } catch (e) {
      stateManager.mutate(new FileListLoadErrorMutator(e));
      return e;
    }
  }
}
