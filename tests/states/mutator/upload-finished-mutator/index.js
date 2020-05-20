import {UploadFinishedMutator} from '../../../../app/states/mutator/upload-finished-mutator';

const {test, module} = QUnit;
export default module('UploadFinishedMutator', function () {
  let state;
  
  test('should remove folder id to uploadingFolderIds.', function (assert) {
    state = {
      uploadingFolderIds: new Set(['423', 'sdf', 'jhd']),
    };
    const uploadingItemId = 'sdf';
    const expectedUploadingIds = new Set(['423', 'jhd']);
    const mutator = new UploadFinishedMutator(uploadingItemId);
    
    mutator.apply(state);
    assert.deepEqual(expectedUploadingIds, state.uploadingFolderIds, 'Should contain correct array of ids.');
  });
});
