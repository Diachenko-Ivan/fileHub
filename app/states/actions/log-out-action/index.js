import {Action} from '../';

/**
 * Action that is responsible for changing location and location parameters.
 */
export class LogOutAction extends Action {
  /**
   * Creates new {@type DynamicRouteChangeAction} instance.
   */
  constructor() {
    super();
  }

  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    return await apiService.logOut();
  }
}
