import {Mutator} from '../index.js';

/**
 * @inheritdoc
 */
export class RootFolderErrorMutator extends Mutator {
  /**
   * Creates new {@type UploadErrorMutator} instance.
   *
   * @param {Error} rootFolderIdError - error in the result of getting of folder root id.
   */
  constructor(rootFolderIdError) {
    super();
    this.rootFolderIdError = rootFolderIdError;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.rootFolderIdError = this.rootFolderIdError;
  }
}
