import {Action} from '../';
import {LocationMutator} from '../../mutator/location-mutator';

/**
 * Action that is responsible for changing location and location parameters.
 */
export class DynamicRouteChangeAction extends Action {
  /**
   * Creates new {@type DynamicRouteChangeAction} instance.
   *
   * @param {string} staticPart - current hash value.
   * @param {{}} param - object with dynamic location parameters.
   */
  constructor(staticPart, param) {
    super();
    this.staticPart = staticPart;
    this.param = param;
  }

  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    stateManager.mutate(new LocationMutator(this.staticPart, this.param));
  }
}
