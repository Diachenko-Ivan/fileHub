import {Mutator} from '../index.js';
import {FolderModel} from '../../../models/item/folder/index.js';

/**
 * @inheritdoc
 */
export class FolderMutator extends Mutator {
  /**
   * Creates new {@type FolderMutator} instance.
   *
   * @param {FolderDescription} folder - folder from server.
   */
  constructor(folder) {
    super();
    this.currentFolder = folder;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.currentFolder = new FolderModel(this.currentFolder);
  }
}
