import {Mutator} from '../index.js';

/**
 * Used for adding of new item id to list of renaming items.
 */
export class RenamingItemsMutator extends Mutator {
  /**
   * Creates new {@type RenamingItemsMutator} instance.
   *
   * @param {string} itemId - id of renamed item.
   */
  constructor(itemId) {
    super();
    this.itemId = itemId;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.renamingItemIds = new Set([...state.renamingItemIds, this.itemId]);
  }
}
