import {Action} from '../index.js';
import {ClearErrorMutator} from '../../mutator/remove-state-property-mutator/index.js';

/**
 * Action that is responsible for state property null setting.
 */
export class ClearErrorAction extends Action {
  /**
   * Creates new {@type ClearErrorAction} instance.
   *
   * @param {string} propertyName - file model.
   */
  constructor(propertyName) {
    super();
    this.propertyName = propertyName;
  }

  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    stateManager.mutate(new ClearErrorMutator(this.propertyName));
  }
}
