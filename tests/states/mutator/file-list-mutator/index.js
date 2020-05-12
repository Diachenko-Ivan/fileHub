import {FileListMutator} from '../../../../app/states/mutator/file-list-mutator';

const {test, module} = QUnit;

export default module('FileListMutator test', function () {
  let state;

  test('should set correct file list to state.', function (assert) {
    state = {
      fileList: []
    };
    const fileList = [{id: 'id', name: 'folder', type: 'folder', parentId: '123', filesCount: 10}];
    const mutator = new FileListMutator(fileList);

    mutator.apply(state);
    assert.strictEqual(JSON.stringify(state.fileList), JSON.stringify(fileList), 'Should return the same file list.');
  });
});
