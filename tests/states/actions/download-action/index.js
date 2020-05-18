import {DownloadFileAction} from '../../../../app/states/actions/download-action';

const {test, module} = QUnit;

export default module('DownloadFileAction', function (hook) {
  
  test('should call mutators in correct order after unsuccessful download.', function (assert) {
    const fileModel = {id: '123', name: 'image.png'};
    const action = new DownloadFileAction(fileModel);
    assert.expect(2);
    const done = assert.async();
    const downloadError = new Error('error');
    const apiService = {
      downloadFile() {
        return Promise.reject(downloadError);
      },
    };
    const stateManager = {
      mutate(mutator) {
        assert.step(`${mutator.constructor.name} ${mutator.downloadErrorObject.error.message} ${mutator.downloadErrorObject.model.name}`);
      },
    };
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([`DownloadErrorMutator ${downloadError.message} ${fileModel.name}`], 'Should mutate download error mutator.');
        done();
      });
  });
  
  test('should call mutators in correct order after successful download.', function (assert) {
    const fileModel = {id: '123', name: 'image.png'};
    const action = new DownloadFileAction(fileModel);
    assert.expect(2);
    const done = assert.async();
    const downloadingFile = new File([JSON.stringify('hello')], 'hello.txt');
    const apiService = {
      downloadFile() {
        return Promise.resolve(downloadingFile);
      },
    };
    const stateManager = {
      mutate(mutator) {
        assert.step(`${mutator.constructor.name} ${mutator.fileObject.model.name} ${mutator.fileObject.file.name}`);
      },
    };
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([`DownloadingFileMutator ${fileModel.name} ${downloadingFile.name}`], 'Should mutate downloading file mutator.');
        done();
      });
  });
});
