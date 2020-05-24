import {Action} from '../';
import {DownloadErrorMutator} from '../../mutator/download-error-mutator';
import {DownloadProcessMutator} from '../../mutator/download-process-mutator';
import {DownloadFinishedMutator} from '../../mutator/download-finished-mutator';
import {DownloadService} from '../../../services/dowload-anchor-service';

/**
 * Action that is responsible for file download.
 */
export class DownloadFileAction extends Action {
  
  /**
   * Creates new {@type DownloadFileAction} instance.
   * @param {FileModel} model - file model.
   * @param {DownloadService} downloadService - service for file download.
   */
  constructor(model, downloadService) {
    super();
    this.model = model;
    this.downloadService = downloadService;
  }
  
  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    const model = this.model;
    stateManager.mutate(new DownloadProcessMutator(model.id));
    try {
      const file = await apiService.downloadFile(model.id);
      this.downloadService.downloadFile({model, file});
    } catch (error) {
      stateManager.mutate(new DownloadErrorMutator({error, model}));
    } finally {
      stateManager.mutate(new DownloadFinishedMutator(model.id));
    }
  }
}
