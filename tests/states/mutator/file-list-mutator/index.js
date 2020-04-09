import {FileListMutator} from '../../../../app/states/mutator/file-list-mutator';

const {test, module} = QUnit;

export default module('FileListMutator test', function (hook) {
  let state;

  test('should set correct file list to state.', function (assert) {
    state = {
      fileList: []
    };
    const fileList = [{name: 'folder', type: 'folder', filesCount: 10}];
    const mutator = new FileListMutator(fileList);

    mutator.apply(state);
    assert.deepEqual(state.fileList, fileList, 'Should return the same file list.');
  });
});
