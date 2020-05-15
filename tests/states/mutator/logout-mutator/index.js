import {LogoutMutator} from '../../../../app/states/mutator/logout-mutator';

const {test, module} = QUnit;
export default module('LogoutMutator', function () {
  let state;
  
  test('should set correct isLoggedOut property to state.', function (assert) {
    state = {
      isLoggedOut: false,
    };
    const mutator = new LogoutMutator(true);
    
    mutator.apply(state);
    assert.equal(state.isLoggedOut, true, 'Should set correct value.');
  });
});
