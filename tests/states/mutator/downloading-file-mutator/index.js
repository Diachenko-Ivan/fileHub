import {FileModel} from '../../../../app/models/item/file';
import {DownloadedFileMutator} from '../../../../app/states/mutator/downloading-file-mutator';

const {test, module} = QUnit;

export default module('DownloadedFileMutator', function () {
  let state;
  
  test('should set correct downloading file object to state.', function (assert) {
    state = {
      downloadedFileObject: {},
    };
    const fileObject = {model: new FileModel({name: 'hello.txt', id: '123'}), file: new File([JSON.stringify('hello')], 'hello.txt')};
    const mutator = new DownloadedFileMutator(fileObject);
    
    mutator.apply(state);
    assert.deepEqual(state.downloadedFileObject, fileObject, 'Should contain the equal file object.');
  });
});
