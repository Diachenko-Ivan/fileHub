import {Action} from '../';
import {DownloadingFileMutator} from '../../mutator/downloading-file-mutator';
import {DownloadErrorMutator} from '../../mutator/download-error-mutator';

/**
 * Action that is responsible for file download.
 */
export class DownloadFileAction extends Action {
  
  /**
   * Creates new {@type DownloadFileAction} instance.
   * @param {FileModel} model - file model.
   */
  constructor(model) {
    super();
    this.model = model;
  }
  
  
  async apply(stateManager, apiService) {
    try {
      const file = await apiService.downloadFile(this.model.id);
      stateManager.mutate(new DownloadingFileMutator({model: this.model, file}));
    } catch (e) {
      stateManager.mutate(new DownloadErrorMutator({error: e, model: this.model}));
    }
  }
}
