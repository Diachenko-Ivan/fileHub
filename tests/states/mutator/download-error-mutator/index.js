import {FileModel} from '../../../../app/models/item/file';
import {DownloadErrorMutator} from '../../../../app/states/mutator/download-error-mutator';

const {test, module} = QUnit;

export default module('DownloadErrorMutator', function () {
  let state;
  
  test('should set correct download error object to state.', function (assert) {
    state = {
      downloadErrorObject: {},
    };
    const errorObject = {model: new FileModel({name: 'hello.txt', id: '123'}), error: new Error('error')};
    const mutator = new DownloadErrorMutator(errorObject);
    
    mutator.apply(state);
    assert.deepEqual(state.downloadErrorObject, errorObject, 'Should contain the equal error object.');
  });
});
