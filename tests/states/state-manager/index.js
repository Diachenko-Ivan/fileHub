import {StateManager} from '../../../app/states/state-manager';

const {test, module} = QUnit;

export default module('StateManager test', function (hook) {
  test('should call mutator apply method.', function (assert) {
    const mockState = {};
    const mockMutator = {
      apply() {
        assert.step('Invoked');
      }
    };
    const stateManager = new StateManager(mockState, {});

    stateManager.mutate(mockMutator);
    assert.verifySteps(['Invoked'], 'Should invoke mutator.apply().');
  });

  test('should call action apply method.', function (assert) {
    const mockState = {};
    const mockAction = {
      apply() {
        assert.step('Invoked');
      }
    };
    const stateManager = new StateManager(mockState, {});

    stateManager.dispatch(mockAction);
    assert.verifySteps(['Invoked'], 'Should invoke action.apply().');
  });
});
