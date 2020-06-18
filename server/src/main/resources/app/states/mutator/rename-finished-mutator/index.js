import {Mutator} from '../index.js';

/**
 * Used for removing of item id from list of renaming items.
 */
export class RenamedItemsMutator extends Mutator {
  /**
   * Creates new {@type RenamedItemsMutator} instance.
   *
   * @param {string} itemId - id of renaming item.
   */
  constructor(itemId) {
    super();
    this.itemId = itemId;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.renamingItemIds = new Set(Array.from(state.renamingItemIds).filter((itemId) => itemId !== this.itemId));
  }
}
