import {UserMutator} from '../../../../app/states/mutator/user-mutator';

const {test, module} = QUnit;

export default module('UserMutator test', function (hook) {

  test('should set right user.', function (assert) {
    const state = {};
    const user = {name: 'John'};
    const mutator = new UserMutator(user);
    mutator.apply(state);
    assert.deepEqual(state.user, user, 'Should be equal.');
  });
});
