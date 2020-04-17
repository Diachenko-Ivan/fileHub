import {Action} from '../';
import {FileListLoadErrorMutator} from '../../mutator/file-list-load-error-mutator';

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
      return await apiService.logOut();
    } catch (e) {
      stateManager.mutate(new FileListLoadErrorMutator(e));
      return e;
    }
  }
}
