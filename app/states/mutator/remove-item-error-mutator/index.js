import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class RemoveItemErrorMutator extends Mutator {
  /**
   * Creates new {@type RemoveItemErrorMutator} instance.
   *
   * @param {Error} removeError - error in the result of removing.
   * @param {FileDescription | FolderDescription} removingModel - model of item that is being removed.
   */
  constructor(removeError, removingModel) {
    super();
    this.removeError = removeError;
    this.removingModel = removingModel;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.removeError = this.removeError;
  }
}
