import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class RenamingItemMutator extends Mutator {
  /**
   * Creates new {@type FolderMutator} instance.
   *
   * @param {string} itemId - fid of renaming item.
   */
  constructor(itemId) {
    super();
    this.itemId = itemId;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.renamingItemId = this.itemId;
  }
}
