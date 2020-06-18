import {Mutator} from '../index.js';

/**
 * @inheritdoc
 */
export class FileListLoadingMutator extends Mutator {
  /**
   * Creates new {@type FileListLoadingMutator} instance.
   *
   * @param {boolean} isLoading - flag that defines list loading.
   */
  constructor(isLoading) {
    super();
    this.isLoading = isLoading;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.isLoading = this.isLoading;
  }
}
