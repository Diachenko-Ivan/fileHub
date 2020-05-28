import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class NewFolderSourceMutator extends Mutator {
  /**
   * Creates new {@type NewFolderSourceMutator} instance.
   *
   * @param {FolderModel} folder - model of folder where new folder is being created in.
   */
  constructor(folder) {
    super();
    this.newFolderSource = folder;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.newFolderSource = this.newFolderSource;
  }
}
