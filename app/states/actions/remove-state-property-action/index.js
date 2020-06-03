import {Action} from '../';
import {RemoveStatePropertyMutator} from '../../mutator/remove-state-property-mutator';

/**
 * Action that is responsible for state property null setting.
 */
export class RemoveStatePropertyAction extends Action {
  
  /**
   * Creates new {@type RemoveStatePropertyAction} instance.
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
    stateManager.mutate(new RemoveStatePropertyMutator(this.propertyName));
  }
}
