import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class RemovingItemsMutator extends Mutator {
  /**
   * Creates new {@type RemovingItemsMutator} instance.
   *
   * @param {string} removingItemId - id of item that is being removed.
   */
  constructor(removingItemId) {
    super();
    this.removingItemId = removingItemId;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    const removingItemsIds = state.removingItemsIds;
    const itemId = this.removingItemId;
    if (removingItemsIds.includes(itemId)) {
      removingItemsIds.splice(removingItemsIds.indexOf(itemId), 1);
    } else {
      removingItemsIds.push(itemId);
    }
    state.removingItemsIds = removingItemsIds
  }
}
