import {FileListLoadingMutator} from '../../mutator/file-list-loading-mutator';
import {Action} from '../index.js';
import {FileListLoadErrorMutator} from '../../mutator/file-list-load-error-mutator';
import {FileListMutator} from '../../mutator/file-list-mutator';

/**
 * Action that is responsible for getting file item list.
 */
export class GetFileListAction extends Action {
  constructor() {
    super();
  }

  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    stateManager.mutate(new FileListLoadingMutator(true));
    try {
      const response = await apiService.getFileItemList();
      stateManager.mutate(new FileListLoadingMutator(false));
      stateManager.mutate(new FileListMutator(response.fileList));
      return response.fileList;
    } catch (e) {
      stateManager.mutate(new FileListLoadErrorMutator(e));
    }
  }
}
