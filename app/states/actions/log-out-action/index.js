import {Action} from '../';
import {LogoutMutator} from '../../mutator/logout-mutator';
import {LogoutErrorMutator} from '../../mutator/logout-error-mutator';

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
    try {
      await apiService.logOut();
      stateManager.mutate(new LogoutMutator(true));
    } catch (e) {
      stateManager.mutate(new LogoutErrorMutator(e));
    }
  }
}
