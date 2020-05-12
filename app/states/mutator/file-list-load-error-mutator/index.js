import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class FileListLoadErrorMutator extends Mutator {
  /**
   * Creates new {@type FileListLoadErrorMutator} instance.
   *
   * @param {Error} loadError - error in list loading.
   */
  constructor(loadError) {
    super();
    this.loadError = loadError;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.loadError = this.loadError;
  }
}
