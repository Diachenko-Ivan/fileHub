import {Action} from '../index.js';
import {RootFolderErrorMutator} from '../../mutator/root-folder-error-mutator/index.js';
import {RootFolderIdMutator} from '../../mutator/root-folder-id-mutator/index.js';

/**
 * Action that is responsible for getting of root folder id.
 */
export class GetRootFolderIdAction extends Action {

  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    try {
      const rootFolderId = await apiService.getRootFolderId();
      stateManager.mutate(new RootFolderIdMutator(rootFolderId));
    } catch (e) {
      stateManager.mutate(new RootFolderErrorMutator(e));
    }
  }
}
