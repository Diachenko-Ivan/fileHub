import {Mutator} from '../index.js';

/**
 * @inheritdoc
 */
export class RootFolderIdMutator extends Mutator {
  /**
   * Creates new {@type RootFolderIdMutator} instance.
   *
   * @param {string} rootFolderId - value of root folder id.
   */
  constructor(rootFolderId) {
    super();
    this.rootFolderId = rootFolderId;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.rootFolderId = this.rootFolderId;
  }
}
