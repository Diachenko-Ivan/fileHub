import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class RemoveStatePropertyMutator extends Mutator {
  /**
   * Creates new {@type RemovingItemsMutator} instance.
   *
   * @param {string} propertyName - name of property that is going to be null.
   */
  constructor(propertyName) {
    super();
    this.propertyName = propertyName;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state[this.propertyName] = null;
  }
}
