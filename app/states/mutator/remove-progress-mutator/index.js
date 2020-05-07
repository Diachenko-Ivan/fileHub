import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class RemoveProgressMutator extends Mutator {
  /**
   * Creates new {@type RemoveProgressMutator} instance.
   *
   * @param {Boolean} inRemoveProgress - flag that defines item removing.
   */
  constructor(inRemoveProgress) {
    super();
    this.inRemoveProgress = inRemoveProgress;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.inRemoveProgress = this.inRemoveProgress;
  }
}
