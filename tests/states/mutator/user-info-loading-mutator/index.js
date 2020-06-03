import {UserInfoLoadingMutator} from '../../../../app/states/mutator/user-info-loading-mutator';

const {test, module} = QUnit;

export default module('UserInfoLoadingMutator', function () {
  let state;
  
  test('should set user loading property true.', function (assert) {
    state = {};
    const mutator = new UserInfoLoadingMutator(true);
    mutator.apply(state);
    assert.ok(state.isUserLoading, 'Should be loading.');
  });
  test('should set user loading property true.', function (assert) {
    state = {
      isUserLoading: true,
    };
    const mutator = new UserInfoLoadingMutator(false);
    mutator.apply(state);
    assert.notOk(state.isUserLoading, 'Should not be loading.');
  });
});





