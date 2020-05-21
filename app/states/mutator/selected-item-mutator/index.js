import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class SelectedItemMutator extends Mutator {
  /**
   * Creates new {@type SelectedItemMutator} instance.
   *
   * @param {string} itemId - id of selected item.
   */
  constructor(itemId) {
    super();
    this.itemId = itemId;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.selectedItemId = this.itemId;
  }
}
