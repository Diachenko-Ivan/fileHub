import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class LogoutMutator extends Mutator {
  /**
   * Creates new {@type LogoutMutator} instance.
   *
   * @param {boolean} isLoggedOut - current hash value.
   */
  constructor(isLoggedOut) {
    super();
    this.isLoggedOut = isLoggedOut;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.isLoggedOut = this.isLoggedOut;
  }
}
