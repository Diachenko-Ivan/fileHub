import {Mutator} from '../';
import {PageNotFoundError} from '../../../models/errors/page-not-found-error';

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
    if (this.removeError instanceof PageNotFoundError) {
      this.removeError.message = `Failed to remove ${this.removingModel.name}! It can be already removed.`;
    }
    state.removeError = this.removeError;
  }
}
