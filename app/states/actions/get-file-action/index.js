import {Action} from '../';
import {FileListLoadErrorMutator} from '../../mutator/file-list-load-error-mutator';

/**
 * Action that is responsible for getting file item list.
 */
export class GetFileAction extends Action {

  constructor(fileId) {
    super();
    this.id=fileId;
  }


  async apply(stateManager, apiService) {
    try {
      return await apiService.downloadFile(this.id);
    }catch (e) {
      stateManager.mutate(new FileListLoadErrorMutator(e));
    }
  }
}
