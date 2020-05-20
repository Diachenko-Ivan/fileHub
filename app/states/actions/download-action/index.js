import {Action} from '../';
import {DownloadedFileMutator} from '../../mutator/downloading-file-mutator';
import {DownloadErrorMutator} from '../../mutator/download-error-mutator';
import {DownloadProcessMutator} from '../../mutator/download-process-mutator';
import {DownloadFinishedMutator} from '../../mutator/download-finished-mutator';

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
    const model = this.model;
    stateManager.mutate(new DownloadProcessMutator(model.id));
    try {
      const file = await apiService.downloadFile(model.id);
      stateManager.mutate(new DownloadedFileMutator({model, file}));
    } catch (error) {
      stateManager.mutate(new DownloadErrorMutator({error, model}));
    } finally {
      stateManager.mutate(new DownloadFinishedMutator(model.id));
    }
  }
}
