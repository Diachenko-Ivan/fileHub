import {RenameErrorMutator} from '../../../../app/states/mutator/rename-error-mutator';

const {test, module} = QUnit;
export default module('RenameErrorMutator', function () {
  
  test('should set correct rename error to state.', function (assert) {
    const state = {
      renameErrorObject: {},
    };
    const error = new Error('upload error');
    const model = {id: '123', name: 'docs'};
    const expectedErrorObject = {error, model};
    const mutator = new RenameErrorMutator({error, model});
    
    mutator.apply(state);
    assert.deepEqual(state.renameErrorObject, expectedErrorObject, 'Should set correct error and model.');
  });
});
