import {UploadFileAction} from '../../../../app/states/actions/upload-file-action';
import {GetFolderAction} from '../../../../app/states/actions/file-list-action';
import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';

const {test, module} = QUnit;

export default module('UploadFileAction', function (hook) {
  
  test('should dispatch GetFolderAction after successful upload.', function (assert) {
    const action = new UploadFileAction('id', new File([JSON.stringify({})], 'file'));
    assert.expect(2);
    const done = assert.async();
    const folderId = 'root';
    const stateManager = {
      state: {
        currentFolder: {
          id: folderId,
        },
      },
      dispatch(action) {
        return new Promise((resolve, reject) => {
          if (action instanceof GetFolderAction) {
            assert.step(`GetFolderAction ${action.folderId}`);
            resolve();
          }
          reject(new Error());
        });
      },
    };
    const apiService = {
      uploadFile() {
        return Promise.resolve();
      },
    };
    
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([`GetFolderAction ${folderId}`], 'Should dispatch GetFolderAction after success upload.');
        done();
      });
  });
  
  test('should call load error mutator after unsuccessful upload.', function (assert) {
    const action = new UploadFileAction('id', new File([JSON.stringify({})], 'file'));
    assert.expect(2);
    const done = assert.async();
    const loadError = new Error('error');
    const stateManager = {
      mutate(mutator) {
        if (mutator instanceof FileListLoadErrorMutator) {
          assert.step(`FileListLoadErrorMutator ${mutator.loadError}`);
        }
      },
    };
    const apiService = {
      uploadFile() {
        return Promise.reject(loadError);
      },
    };
    
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([`FileListLoadErrorMutator ${loadError}`], 'Should call FileListLoadErrorMutator.');
        done();
      });
  });
});
