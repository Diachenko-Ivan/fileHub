import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class UserErrorMutator extends Mutator {
  /**
   * Creates new {@type UserErrorMutator} instance.
   *
   * @param {Error} error - error in getting of user.
   */
  constructor(error) {
    super();
    this.userError = error;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.userError = this.userError;
  }
}
