import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class NewFolderMutator extends Mutator {
  /**
   * Creates new {@type NewFolderMutator} instance.
   *
   * @param {string} newFolderId - new created folder id.
   */
  constructor(newFolderId) {
    super();
    this.newFolderId = newFolderId;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.newFolderId = this.newFolderId;
  }
}
