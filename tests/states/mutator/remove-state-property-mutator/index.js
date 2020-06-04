import {AuthenticationError} from '../../../../app/models/errors/authentication-error';
import {ClearErrorMutator} from '../../../../app/states/mutator/remove-state-property-mutator';

const {test, module} = QUnit;

export default module('ClearErrorMutator', function () {
  let state;
  
  test('should set state property null value.', function (assert) {
    state = {
      userError: new AuthenticationError(),
    };
    const mutator = new ClearErrorMutator('userError');
    
    mutator.apply(state);
    assert.notOk(state.userError, 'Should be null.');
  });
});
