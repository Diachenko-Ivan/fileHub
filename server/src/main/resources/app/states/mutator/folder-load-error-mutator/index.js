import {Mutator} from '../index.js';

/**
 * @inheritdoc
 */
export class FolderLoadErrorMutator extends Mutator {
  /**
   * Creates new {@type FolderLoadErrorMutator} instance.
   *
   * @param {Error} folderLoadError - error in folder loading.
   */
  constructor(folderLoadError) {
    super();
    this.folderLoadError = folderLoadError;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.folderLoadError = this.folderLoadError;
  }
}
