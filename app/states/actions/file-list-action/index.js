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
      const fileList = await apiService.getFileItemList();
      stateManager.mutate(new FileListMutator(fileList.fileList));
      return fileList;
      return {};
    } catch (e) {
      stateManager.mutate(new FileListLoadErrorMutator(e));
    }
  }
}
