import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class LogoutErrorMutator extends Mutator {
  /**
   * Creates new {@type LogoutMutator} instance.
   *
   * @param {Error} logoutError - current hash value.
   */
  constructor(logoutError) {
    super();
    this.logoutError = logoutError;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.logoutError = this.logoutError;
  }
}
