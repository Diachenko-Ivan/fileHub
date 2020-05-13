import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class RemovedItemsMutator extends Mutator {
  /**
   * Creates new {@type RemovedItemsMutator} instance.
   *
   * @param {string} removedItemId - id of item that is already removed.
   */
  constructor(removedItemId) {
    super();
    this.removedItemId = removedItemId;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    const removingItemsIds = state.removingItemIds;
    const itemId = this.removedItemId;
    removingItemsIds.splice(removingItemsIds.indexOf(itemId), 1);
    state.removingItemIds = removingItemsIds;
  }
}
