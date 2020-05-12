import {UserErrorMutator} from '../../../../app/states/mutator/user-error-mutator';

const {test, module} = QUnit;

export default module('UserErrorMutator', function () {
  
  test('should set correct user error.', function (assert) {
    const state = {};
    const error = new Error('Failed');
    const mutator = new UserErrorMutator(error);
    mutator.apply(state);
    assert.deepEqual(state.userError, error, 'Should be equal.');
  });
});
