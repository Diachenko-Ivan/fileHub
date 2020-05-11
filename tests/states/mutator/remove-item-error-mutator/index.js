import {RemoveItemErrorMutator} from '../../../../app/states/mutator/remove-item-error-mutator';
import {AuthenticationError} from '../../../../app/models/errors/authentication-error';
import {PageNotFoundError} from '../../../../app/models/errors/page-not-found-error';

const {test, module} = QUnit;

export default module('RemoveItemErrorMutator', function () {
  let state = {};
  
  test('should set correct remove error to state.', function (assert) {
    const message = 'Authorization failed.';
    const removeError = new AuthenticationError(message);
    const removingModel = {id: 'asd', name: 'docs'};
    const mutator = new RemoveItemErrorMutator(removeError, removingModel);
    
    mutator.apply(state);
    assert.deepEqual(state.removeError, removeError, 'Should return the same error message.');
  });
  
  test('should set message if item is not found in the result of remove.', function (assert) {
    const removeError = new PageNotFoundError();
    const removingModel = {id: 'asd', name: 'docs'};
    const mutator = new RemoveItemErrorMutator(removeError, removingModel);
    
    mutator.apply(state);
    assert.ok(state.removeError.message, 'Should contain set error message.');
  });
});
