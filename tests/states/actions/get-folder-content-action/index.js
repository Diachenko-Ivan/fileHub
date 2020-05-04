import {GetFolderContentAction} from '../../../../app/states/actions/get-folder-content-action';
import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';
import {FileListMutator} from '../../../../app/states/mutator/file-list-mutator';
import {FileListLoadingMutator} from '../../../../app/states/mutator/file-list-loading-mutator';

const {test, module} = QUnit;

export default module('GetFolderContentAction', function (hook) {
  
  test('should call load error mutator.', function (assert) {
    const action = new GetFolderContentAction('qw');
    assert.expect(4);
    const done = assert.async();
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof FileListLoadErrorMutator) {
          assert.step(`FileListLoadErrorMutator ${mutator.loadError.message}`);
        } else if (mutator instanceof FileListLoadingMutator) {
          assert.step(`FileListLoadingMutator ${mutator.isLoading}`);
        } else {
          assert.step(mutator.constructor.name);
        }
      },
    };
    const mockApiService = {
      getFolderContent() {
        return Promise.reject(new Error('error'));
      },
    };
    
    action.apply(mockStateManager, mockApiService)
      .then(() => {
        assert.verifySteps([
            'FileListLoadingMutator true',
            'FileListLoadErrorMutator error',
            'FileListLoadingMutator false'],
          'Should call mutators in the correct order.');
        done();
      });
  });
  
  test('should call folder content(file list) mutator.', function (assert) {
    const action = new GetFolderContentAction('qw');
    assert.expect(4);
    const done = assert.async();
    const content = [{name: 'file.pdf'}];
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof FileListMutator) {
          assert.step(`FileListMutator ${mutator.fileList}`);
        } else if (mutator instanceof FileListLoadingMutator) {
          assert.step(`FileListLoadingMutator ${mutator.isLoading}`);
        } else {
          assert.step(mutator.constructor.name);
        }
      },
    };
    const mockApiService = {
      getFolderContent() {
        return Promise.resolve(content);
      },
    };
    
    action.apply(mockStateManager, mockApiService)
      .then(() => {
        assert.verifySteps([
            'FileListLoadingMutator true',
            `FileListMutator ${content}`,
            'FileListLoadingMutator false'],
          'Should call mutators in the correct order.');
        done();
      });
  });
});
