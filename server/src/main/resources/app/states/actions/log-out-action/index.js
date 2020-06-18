import {Action} from '../index.js';

/**
 * Action that is responsible for user log out.
 */
export class LogOutAction extends Action {
  /**
   * Creates new {@type LogOutAction} instance.
   */
  constructor() {
    super();
  }

  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    await apiService.logOut();
  }
}
