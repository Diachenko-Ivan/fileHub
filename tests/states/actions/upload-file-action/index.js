import {UploadFileAction} from '../../../../app/states/actions/upload-file-action';
import {UploadProcessMutator} from '../../../../app/states/mutator/upload-process-mutator';
import {UploadFinishedMutator} from '../../../../app/states/mutator/upload-finished-mutator';
import {UploadErrorMutator} from '../../../../app/states/mutator/upload-error-mutator';
import {AuthenticationError} from '../../../../app/models/errors/authentication-error';

const {test, module} = QUnit;

export default module('UploadFileAction', function () {
  
  test('should call mutators and actions in correct order after success upload.', function (assert) {
    const folderId = 'root';
    const action = new UploadFileAction({id: folderId}, new File([JSON.stringify({})], 'file'));
    assert.expect(4);
    const done = assert.async();
    const stateManager = {
      state: {
        currentFolder: {
          id: folderId,
        },
      },
      dispatch(action) {
        assert.step(`${action.constructor.name} ${action.folderId}`);
        return Promise.resolve();
      },
      mutate(mutator) {
        if (mutator instanceof UploadProcessMutator) {
          assert.step(`UploadProcessMutator ${mutator.uploadingFolderId}`);
        } else if (mutator instanceof UploadFinishedMutator) {
          assert.step(`UploadFinishedMutator ${mutator.uploadFinishedFolderId}`);
        } else {
          assert.step(action.constructor.name);
        }
      },
    };
    const apiService = {
      uploadFile() {
        return Promise.resolve();
      },
    };
    
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([
          `UploadProcessMutator ${folderId}`,
          `UploadFinishedMutator ${folderId}`,
          `GetFolderContentAction ${folderId}`,
        ], 'Should call mutators and actions in correct order.');
        done();
      });
  });
  
  test('should call mutators in correct order and do not call GetFolderContentAction after success upload.', function (assert) {
    const folderId = 'root';
    const action = new UploadFileAction({id: folderId}, new File([JSON.stringify({})], 'file'));
    assert.expect(3);
    const done = assert.async();
    const stateManager = {
      state: {
        currentFolder: {
          id: folderId,
        },
      },
      dispatch(action) {
        assert.step(`${action.constructor.name} ${action.folderId}`);
        return Promise.resolve();
      },
      mutate(mutator) {
        if (mutator instanceof UploadProcessMutator) {
          assert.step(`UploadProcessMutator ${mutator.uploadingFolderId}`);
          this.state.currentFolder.id = '123';
        } else if (mutator instanceof UploadFinishedMutator) {
          assert.step(`UploadFinishedMutator ${mutator.uploadFinishedFolderId}`);
        } else {
          assert.step(action.constructor.name);
        }
      },
    };
    const apiService = {
      uploadFile() {
        return Promise.resolve();
      },
    };
    
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([
          `UploadProcessMutator ${folderId}`,
          `UploadFinishedMutator ${folderId}`,
        ], 'Should call mutators in correct order.');
        done();
      });
  });
  
  test('should call mutators and actions in correct order after unsuccessful upload.', function (assert) {
    const folderId = 'root';
    const action = new UploadFileAction({id: folderId}, new File([JSON.stringify({})], 'file'));
    assert.expect(5);
    const done = assert.async();
    const uploadError = new Error('error');
    const stateManager = {
      state: {
        currentFolder: {
          id: folderId,
        },
      },
      dispatch(action) {
        assert.step(`${action.constructor.name} ${action.folderId}`);
        return Promise.resolve();
      },
      mutate(mutator) {
        if (mutator instanceof UploadProcessMutator) {
          assert.step(`UploadProcessMutator ${mutator.uploadingFolderId}`);
        } else if (mutator instanceof UploadFinishedMutator) {
          assert.step(`UploadFinishedMutator ${mutator.uploadFinishedFolderId}`);
        } else if (mutator instanceof UploadErrorMutator) {
          assert.step(`UploadErrorMutator ${mutator.uploadErrorObject.error.message}`);
        } else {
          assert.step(action.constructor.name);
        }
      },
    };
    const apiService = {
      uploadFile() {
        return Promise.reject(uploadError);
      },
    };
    
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([
          `UploadProcessMutator ${folderId}`,
          `UploadErrorMutator ${uploadError.message}`,
          `UploadFinishedMutator ${folderId}`,
          `GetFolderContentAction ${folderId}`,
        ], 'Should call mutators and actions in correct order.');
        done();
      });
  });
  
  test('should call mutators in correct order and do not call GetFolderContentAction after unsuccessful upload.', function (assert) {
    const folderId = 'root';
    const action = new UploadFileAction({id: folderId}, new File([JSON.stringify({})], 'file'));
    assert.expect(4);
    const done = assert.async();
    const uploadError = new AuthenticationError('error');
    const stateManager = {
      state: {
        currentFolder: {
          id: folderId,
        },
      },
      dispatch(action) {
        assert.step(`${action.constructor.name} ${action.folderId}`);
        return Promise.resolve();
      },
      mutate(mutator) {
        if (mutator instanceof UploadProcessMutator) {
          assert.step(`UploadProcessMutator ${mutator.uploadingFolderId}`);
        } else if (mutator instanceof UploadFinishedMutator) {
          assert.step(`UploadFinishedMutator ${mutator.uploadFinishedFolderId}`);
        } else if (mutator instanceof UploadErrorMutator) {
          assert.step(`UploadErrorMutator ${mutator.uploadErrorObject.error.message}`);
        } else {
          assert.step(action.constructor.name);
        }
      },
    };
    const apiService = {
      uploadFile() {
        return Promise.reject(uploadError);
      },
    };
    
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([
          `UploadProcessMutator ${folderId}`,
          `UploadErrorMutator ${uploadError.message}`,
          `UploadFinishedMutator ${folderId}`,
        ], 'Should call mutators and do not call GetFolderContentAction because of AuthenticationError.');
        done();
      });
  });
});
