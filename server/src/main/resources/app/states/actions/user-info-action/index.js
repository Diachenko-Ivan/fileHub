import {Action} from '../index.js';
import {UserMutator} from '../../mutator/user-mutator/index.js';
import {UserErrorMutator} from '../../mutator/user-error-mutator/index.js';
import {UserInfoLoadingMutator} from '../../mutator/user-info-loading-mutator/index.js';

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
    let user;
    let possibleError;
    stateManager.mutate(new UserInfoLoadingMutator(true));
    try {
      user = await apiService.getUserInfo();
    } catch (e) {
      possibleError = e;
      stateManager.mutate(new UserErrorMutator(e));
    } finally {
      stateManager.mutate(new UserInfoLoadingMutator(false));
      if (!possibleError) {
        stateManager.mutate(new UserMutator(user));
      }
    }
  }
}
