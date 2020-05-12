import {UploadErrorMutator} from '../../../../app/states/mutator/upload-error-mutator';

const {test, module} = QUnit;
export default module('UploadErrorMutator', function () {
  
  test('should set correct upload error to state.', function (assert) {
    const state = {
      uploadError: {},
    };
    const error = new Error('upload error');
    const mutator = new UploadErrorMutator(error);
    
    mutator.apply(state);
    assert.deepEqual(state.uploadError, error, 'Should set correct error value.');
  });
});
