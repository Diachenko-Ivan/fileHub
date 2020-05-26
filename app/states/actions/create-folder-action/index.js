import {Action} from '../index.js';
import {NewFolderMutator} from '../../mutator/new-folder-mutator';
import {GetFolderContentAction} from '../get-folder-content-action';
import {CreateFolderErrorMutator} from '../../mutator/create-folder-error-mutator';
import {NewFolderSourceMutator} from '../../mutator/new-folder-source-mutator';

/**
 * Action that is responsible for creating a new folder.
 */
export class CreateFolderAction extends Action {
  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    const parentFolder = stateManager.state.currentFolder;
    stateManager.mutate(new NewFolderSourceMutator(parentFolder));
    try {
      const newFolder = await apiService.getNewFolder({
        type: 'folder',
        filesCount: 0,
        parentId: parentFolder.id,
      });
      if (parentFolder.id === stateManager.state.currentFolder.id) {
        await stateManager.dispatch(new GetFolderContentAction(parentFolder.id));
      }
      stateManager.mutate(new NewFolderMutator(newFolder.id));
    } catch (e) {
      stateManager.mutate(new CreateFolderErrorMutator(e));
    } finally {
      stateManager.mutate(new NewFolderSourceMutator(null));
    }
  }
}
