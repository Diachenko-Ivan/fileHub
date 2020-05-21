import {Action} from '../';
import {EditingItemMutator} from '../../mutator/editing-item-mutator';
import {SelectedItemMutator} from '../../mutator/selected-item-mutator';

/**
 * Action that is responsible for change item view.
 */
export class ItemViewAction extends Action {
  /**
   * Creates new {@type ItemViewAction} instance.
   */
  constructor(id) {
    super();
    this.id = id;
  }
  
  /**
   * @inheritdoc
   */
  async apply(stateManager, apiService) {
    const selectedItemId = stateManager.state.selectedItemId;
    if (!this.id) {
      stateManager.mutate(new EditingItemMutator(null));
      return;
    }
    if (this.id === selectedItemId) {
      stateManager.mutate(new SelectedItemMutator(null));
      stateManager.mutate(new EditingItemMutator(this.id));
    } else {
      stateManager.mutate(new EditingItemMutator(null));
      stateManager.mutate(new SelectedItemMutator(this.id));
    }
  }
}
