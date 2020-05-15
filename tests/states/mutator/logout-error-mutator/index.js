import {LogoutErrorMutator} from '../../../../app/states/mutator/logout-error-mutator';

const {test, module} = QUnit;
export default module('LogoutErrorMutator', function () {
  let state;
  
  test('should set correct logout error property to state.', function (assert) {
    state = {
      logoutError: {},
    };
    const error = new Error('error');
    const mutator = new LogoutErrorMutator(error);
    
    mutator.apply(state);
    assert.deepEqual(state.logoutError, error, 'Should set correct value.');
  });
});
