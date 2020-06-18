import {Mutator} from '../index.js';

/**
 * @inheritdoc
 */
export class FolderLoadingMutator extends Mutator {
  /**
   * Creates new {@type FolderLoadingMutator} instance.
   *
   * @param {boolean} isFolderLoading - flag that defines folder loading.
   */
  constructor(isFolderLoading) {
    super();
    this.isFolderLoading = isFolderLoading;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.isFolderLoading = this.isFolderLoading;
  }
}
