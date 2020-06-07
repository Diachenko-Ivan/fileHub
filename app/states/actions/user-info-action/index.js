import {Action} from '../';
import {UserMutator} from '../../mutator/user-mutator';
import {UserErrorMutator} from '../../mutator/user-error-mutator';
import {UserInfoLoadingMutator} from '../../mutator/user-info-loading-mutator';

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
