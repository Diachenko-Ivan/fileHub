import {DownloadFileAction} from '../../../../app/states/actions/download-action';
import {DownloadProcessMutator} from '../../../../app/states/mutator/download-process-mutator';
import {DownloadFinishedMutator} from '../../../../app/states/mutator/download-finished-mutator';
import {DownloadErrorMutator} from '../../../../app/states/mutator/download-error-mutator';
import {DownloadedFileMutator} from '../../../../app/states/mutator/downloading-file-mutator';

const {test, module} = QUnit;

export default module('DownloadFileAction', function (hook) {
  
  test('should call mutators in the correct order after unsuccessful download.', function (assert) {
    const fileModel = {id: '123', name: 'image.png'};
    const action = new DownloadFileAction(fileModel);
    assert.expect(4);
    const done = assert.async();
    const downloadError = new Error('error');
    const apiService = {
      downloadFile() {
        return Promise.reject(downloadError);
      },
    };
    const stateManager = {
      mutate(mutator) {
        if (mutator instanceof DownloadProcessMutator) {
          assert.step(`DownloadProcessMutator ${mutator.downloadingFileId}`);
        } else if (mutator instanceof DownloadFinishedMutator) {
          assert.step(`DownloadFinishedMutator ${mutator.downloadedFileId}`);
        } else if (mutator instanceof DownloadErrorMutator) {
          assert.step(`DownloadErrorMutator ${mutator.downloadErrorObject.error.message} ${mutator.downloadErrorObject.model.name}`);
        } else {
          assert.step(mutator.constructor.name);
        }
      },
    };
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([
          `DownloadProcessMutator ${fileModel.id}`,
          `DownloadErrorMutator ${downloadError.message} ${fileModel.name}`,
          `DownloadFinishedMutator ${fileModel.id}`], 'Should call mutators in the correct order.');
        done();
      });
  });
  
  test('should call mutators in correct order after successful download.', function (assert) {
    const fileModel = {id: '123', name: 'image.png'};
    const action = new DownloadFileAction(fileModel);
    assert.expect(4);
    const done = assert.async();
    const downloadingFile = new File([JSON.stringify('hello')], 'hello.txt');
    const apiService = {
      downloadFile() {
        return Promise.resolve(downloadingFile);
      },
    };
    const stateManager = {
      mutate(mutator) {
        if (mutator instanceof DownloadProcessMutator) {
          assert.step(`DownloadProcessMutator ${mutator.downloadingFileId}`);
        } else if (mutator instanceof DownloadFinishedMutator) {
          assert.step(`DownloadFinishedMutator ${mutator.downloadedFileId}`);
        } else if (mutator instanceof DownloadedFileMutator) {
          assert.step(`DownloadedFileMutator ${mutator.fileObject.model.id}`);
        } else {
          assert.step(mutator.constructor.name);
        }
      },
    };
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([
          `DownloadProcessMutator ${fileModel.id}`,
          `DownloadedFileMutator ${fileModel.id}`,
          `DownloadFinishedMutator ${fileModel.id}`], 'Should call mutators in the correct order.');
        done();
      });
  });
});
