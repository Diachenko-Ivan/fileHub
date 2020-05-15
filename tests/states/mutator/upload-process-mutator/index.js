import {UploadProcessMutator} from '../../../../app/states/mutator/upload-process-mutator';

const {test, module} = QUnit;
export default module('UploadProcessMutator', function () {
  let state;
  
  test('should add folder to uploadingFolderIds.', function (assert) {
    state = {
      uploadingFolderIds: new Set(['423', 'sdf', 'jhd']),
    };
    const uploadingItemId = 'asd';
    const expectedUploadingIds = new Set(['423', 'sdf', 'jhd', 'asd']);
    const mutator = new UploadProcessMutator(uploadingItemId);
    
    mutator.apply(state);
    assert.deepEqual(expectedUploadingIds, state.uploadingFolderIds, 'Should contain correct array of ids.');
  });
});
