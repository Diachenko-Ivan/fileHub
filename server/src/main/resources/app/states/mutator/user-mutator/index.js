import {Mutator} from '../index.js';

/**
 * @inheritdoc
 */
export class UserMutator extends Mutator {
  /**
   * Creates new {@type UserMutator} instance.
   *
   * @param {{name:string, id:string}} user - current user.
   */
  constructor(user) {
    super();
    this.user = user;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.user = this.user;
  }
}
