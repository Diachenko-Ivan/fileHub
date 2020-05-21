import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class EditingItemMutator extends Mutator {
  /**
   * Creates new {@type FolderMutator} instance.
   *
   * @param {string} itemId - folder from server.
   */
  constructor(itemId) {
    super();
    this.itemId = itemId;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.editingItemId = this.itemId;
  }
}
