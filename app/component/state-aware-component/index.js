import {Component} from '../parent-component.js';

/**
 * Abstract component of highest order that can have a state.
 */
export class StateAwareComponent extends Component {
  _stateChangeHandlers = [];

  /**
   * Creates new instance.
   *
   * @param container
   * @param {StateManager} stateManager -
   */
  constructor(container, stateManager) {
    super(container);
    this.stateManager = stateManager;
    this.initState();
  }

  /**
   * Dispatches action from component.
   *
   * @param {Action} action - action that is going to be executed.
   * @return {Promise}
   */
  dispatch(action) {
    return this.stateManager.dispatch(action);
  }

  initState() {
  }

  /**
   * Removes event listeners for state aware component.
   */
  removeStateChangeListeners() {
    this._stateChangeHandlers.forEach(({property, listener}) => {
      this.stateManager.removeStateChangedListener(property, listener);
    });
  }

  /**
   * Registers handler for concrete property.
   *
   * @param {string} property - name of state property.
   * @param {Function} handler - function that is invoked when property is changed.
   */
  onStateChange(property, handler) {
    const listener = () => handler(this.stateManager.state);
    this.stateManager.onStateChanged(property, listener);
    this._stateChangeHandlers.push({property, listener});
  }

  /**
   * @inheritdoc
   */
  destroy() {
    super.destroy();
    this.removeStateChangeListeners();
  }
}
