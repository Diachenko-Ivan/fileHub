import {Mutator} from '../index.js';

/**
 * @inheritdoc
 */
export class RemoveItemErrorMutator extends Mutator {
  /**
   * Creates new {@type RemoveItemErrorMutator} instance.
   *
   * @param {Error} removeError - error in the result of removing.
   */
  constructor(removeError) {
    super();
    this.removeError = removeError;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.removeError = this.removeError;
  }
}
