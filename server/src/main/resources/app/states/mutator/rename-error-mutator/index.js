import {Mutator} from '../index.js';

/**
 * @inheritdoc
 */
export class RenameErrorMutator extends Mutator {
  /**
   * Creates new {@type RenameErrorMutator} instance.
   *
   * @param {ErrorObject} renameErrorObject - error in the result of rename.
   */
  constructor(renameErrorObject) {
    super();
    this.renameErrorObject = renameErrorObject;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.renameErrorObject = this.renameErrorObject;
  }
}
