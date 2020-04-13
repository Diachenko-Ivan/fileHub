/**
 * Handles access to state from
 */
export class StateManager extends EventTarget {
  /**
   * Creates new instance.
   *
   * @param initialState - state for this {@type StateManager} instance.
   * @param apiService - service for sending requests.
   */
  constructor(initialState, apiService) {
    super();
    this.apiService = apiService;
    const self = this;

    const handler = {
      set(target, prop, val) {
        const isSet = Reflect.set(...arguments);
        if (isSet) {
          self.dispatchEvent(new Event(`stateChange.${prop}`));
        }
        return isSet;
      }
    };
    this.state = new Proxy(initialState, handler);
  }

  /**
   * Registers function that is invoked when 'stateChange' event happened.
   *
   * @param {string} property - name of state property.
   * @param {Function} handler - function that is invoked when 'stateChange' event happened.
   */
  onStateChanged(property, handler) {
    this.addEventListener(`stateChange.${property}`, handler);
  }

  /**
   * Removes state change event listener.
   *
   * @param {string} property - property whose event listener is deleted.
   * @param {Function} listener - function that is deleted.
   */
  removeStateChangedListener(property, listener) {
    this.removeEventListener(`stateChange.${property}`, listener);
  }

  /**
   * Dispatches new action.
   *
   * @param {Action} action
   * @return {Promise} result
   */
  dispatch(action) {
    return action.apply(this, this.apiService);
  }

  /**
   * Calls mutator that mutates current state.
   *
   * @param {Mutator} mutator
   */
  mutate(mutator) {
    mutator.apply(this.state);
  }
}
