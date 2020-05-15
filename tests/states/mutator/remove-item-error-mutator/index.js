import {RemoveItemErrorMutator} from '../../../../app/states/mutator/remove-item-error-mutator';
import {AuthenticationError} from '../../../../app/models/errors/authentication-error';

const {test, module} = QUnit;

export default module('RemoveItemErrorMutator', function () {
  let state = {};
  
  test('should set correct remove error to state.', function (assert) {
    const message = 'Authorization failed.';
    const removeError = new AuthenticationError(message);
    const mutator = new RemoveItemErrorMutator(removeError);
    
    mutator.apply(state);
    assert.deepEqual(state.removeError, removeError, 'Should return the same error message.');
  });

});
