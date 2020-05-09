import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class FolderLoadingMutator extends Mutator {
  /**
   * Creates new {@type FolderLoadingMutator} instance.
   *
   * @param {Boolean} isFolderLoading - flag that defines folder loading.
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
