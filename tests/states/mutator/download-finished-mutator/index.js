import {DownloadFinishedMutator} from '../../../../app/states/mutator/download-finished-mutator';

const {test, module} = QUnit;
export default module('DownloadFinishedMutator', function () {
  let state;
  
  test('should remove file id from downloadingFileIds.', function (assert) {
    state = {
      downloadingFileIds: new Set(['423', 'sdf', 'jhd']),
    };
    const downloadingItemId = 'sdf';
    const expectedDownloadingIds = new Set(['423', 'jhd']);
    const mutator = new DownloadFinishedMutator(downloadingItemId);
    
    mutator.apply(state);
    assert.deepEqual(expectedDownloadingIds, state.downloadingFileIds, 'Should contain correct array of ids.');
  });
});
