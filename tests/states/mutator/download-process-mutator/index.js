import {DownloadProcessMutator} from '../../../../app/states/mutator/download-process-mutator';

const {test, module} = QUnit;
export default module('DownloadProcessMutator', function () {
  let state;
  
  test('should add file to downloadingFileIds.', function (assert) {
    state = {
      downloadingFileIds: new Set(['423', 'sdf', 'jhd']),
    };
    const downloadingItemId = 'asd';
    const expectedDownloadingIds = new Set(['423', 'sdf', 'jhd', 'asd']);
    const mutator = new DownloadProcessMutator(downloadingItemId);
    
    mutator.apply(state);
    assert.deepEqual(expectedDownloadingIds, state.downloadingFileIds, 'Should contain correct array of ids.');
  });
  
  test('should not add file to downloadingFileIds because it already in download.', function (assert) {
    state = {
      downloadingFileIds: new Set(['423', 'sdf', 'jhd']),
    };
    const downloadingItemId = 'sdf';
    const expectedDownloadingIds = new Set(['423', 'sdf', 'jhd']);
    const mutator = new DownloadProcessMutator(downloadingItemId);
    
    mutator.apply(state);
    assert.deepEqual(expectedDownloadingIds, state.downloadingFileIds, 'Should contain correct array of ids.');
  });
});
