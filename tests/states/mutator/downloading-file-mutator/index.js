import {FileModel} from '../../../../app/models/item/file';
import {DownloadingFileMutator} from '../../../../app/states/mutator/downloading-file-mutator';

const {test, module} = QUnit;

export default module('DownloadingFileMutator', function () {
  let state;
  
  test('should set correct downloading file object to state.', function (assert) {
    state = {
      downloadingFileObject: {},
    };
    const fileObject = {model: new FileModel({name: 'hello.txt', id: '123'}), file: new File([JSON.stringify('hello')], 'hello.txt')};
    const mutator = new DownloadingFileMutator(fileObject);
    
    mutator.apply(state);
    assert.deepEqual(state.downloadingFileObject, fileObject, 'Should contain the equal file object.');
  });
});
