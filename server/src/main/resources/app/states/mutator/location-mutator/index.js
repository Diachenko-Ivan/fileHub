import {Mutator} from '../index.js';

/**
 * @inheritdoc
 */
export class LocationMutator extends Mutator {
  /**
   * Creates new {@type LocationMutator} instance.
   *
   * @param {string} staticPart - current hash value.
   * @param {{}} params - object with dynamic location parameters.
   */
  constructor(staticPart, params) {
    super();
    this.location = staticPart;
    this.locationParam = params;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.location = this.location;
    state.locationParam = this.locationParam;
  }
}
