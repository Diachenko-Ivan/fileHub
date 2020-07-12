import {FileListLoadingMutator} from '../../mutator/file-list-loading-mutator/index.js';
import {Action} from '../index.js';
import {FileListLoadErrorMutator} from '../../mutator/file-list-load-error-mutator/index.js';
import {FileListMutator} from '../../mutator/file-list-mutator/index.js';
import {FileModel} from '../../../models/item/file/index.js';
import {FolderModel} from '../../../models/item/folder/index.js';

/**
 * Action that is responsible for getting folder content.
 */
export class GetFolderContentAction extends Action {
  /**
   * Creates new {@type GetFolderContentAction} instance.
   *
   * @param {string} folderId - id of folder.
   */
  constructor(folderId) {
    super();
    this.folderId = folderId;
  }

  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    stateManager.mutate(new FileListLoadingMutator(true));
    try {
      const folderContentResponse = await apiService.getFolderContent(this.folderId);
      const content = [...this._convertObjectsToFolders(folderContentResponse.folders),
        ...this._convertObjectsToFiles(folderContentResponse.files)];
      stateManager.mutate(new FileListMutator(content));
      return folderContentResponse;
    } catch (e) {
      stateManager.mutate(new FileListLoadErrorMutator(e));
    } finally {
      stateManager.mutate(new FileListLoadingMutator(false));
    }
  }

  _convertObjectsToFiles(files) {
    return files.map((object) => new FileModel(object));
  }

  _convertObjectsToFolders(folders) {
    return folders.map((object) => new FolderModel(object));
  }
}
