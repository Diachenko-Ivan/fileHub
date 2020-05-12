import {Action} from '../';
import {UserMutator} from '../../mutator/user-mutator';
import {UserErrorMutator} from '../../mutator/user-error-mutator';

/**
 * Action that is responsible for getting user info.
 */
export class GetUserInfoAction extends Action {
  /**
   * Creates new {@type GetUserInfoAction} instance.
   */
  constructor() {
    super();
  }
  
  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    try {
      const user = await apiService.getUserInfo();
      stateManager.mutate(new UserMutator(user));
    } catch (e) {
      stateManager.mutate(new UserErrorMutator(e));
    }
  }
}
