import {CreateFolderErrorMutator} from '../../../../app/states/mutator/create-folder-error-mutator';

const {test, module} = QUnit;

export default module('CreateFolderErrorMutator', function () {
  let state;
  
  test('should set correct create folder error to state.', function (assert) {
    state = {
      createFolderError: {},
    };
    const message = 'Error message';
    const createFolderError = new Error(message);
    const mutator = new CreateFolderErrorMutator(createFolderError);
    
    mutator.apply(state);
    assert.equal(state.createFolderError, createFolderError, 'Should return the same error.');
  });
});
