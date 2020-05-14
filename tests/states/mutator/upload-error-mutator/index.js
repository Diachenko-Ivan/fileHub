import {UploadErrorMutator} from '../../../../app/states/mutator/upload-error-mutator';

const {test, module} = QUnit;
export default module('UploadErrorMutator', function () {
  
  test('should set correct upload error to state.', function (assert) {
    const state = {
      uploadErrorObject: {},
    };
    const error = new Error('upload error');
    const model = {id: '123', name: 'docs'};
    const expectedErrorObject = {error, model};
    const mutator = new UploadErrorMutator({error, model});
    
    mutator.apply(state);
    assert.deepEqual(state.uploadErrorObject, expectedErrorObject, 'Should set correct error and model.');
  });
});
