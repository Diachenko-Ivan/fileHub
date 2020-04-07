import {FileListLoadingMutator} from '../../mutator/file-list-loading-mutator';
import {Action} from '../index.js';
import {FileListLoadErrorMutator} from '../../mutator/file-list-load-error-mutator';
import {FileListMutator} from '../../mutator/file-list-mutator';

/**
 * Action that is responsible for getting file item list.
 */
export class FileListAction extends Action {
  constructor() {
    super();
  }

  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    stateManager.mutate(new FileListLoadingMutator(true));
    try {
      setTimeout(()=>{stateManager.mutate(new FileListMutator([{name: 'docs', itemSize: 4, type: 'folder'}]));}, 3000);
      // const fileList = await apiService.getFileItems();

      return {};
    } catch (e) {
      stateManager.mutate(new FileListLoadErrorMutator(e));
    }
  }
}
