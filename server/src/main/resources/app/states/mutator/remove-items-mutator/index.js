import {Mutator} from '../index.js';

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
    const removingItemIds = state.removingItemIds;
    const itemId = this.removingItemId;
    removingItemIds.push(itemId);
    state.removingItemIds = removingItemIds;
  }
}
