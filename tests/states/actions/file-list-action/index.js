import {GetFileListAction} from '../../../../app/states/actions/file-list-action';
import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';
import {FileListMutator} from '../../../../app/states/mutator/file-list-mutator';
import {FileListLoadingMutator} from '../../../../app/states/mutator/file-list-loading-mutator';

const {test, module} = QUnit;

export default module('GetFileListAction test', function () {
  const action = new GetFileListAction();
  const list = [{name: 'file'}];
  
  test('should call FileListLoadErrorMutator.', function (assert) {
    assert.expect(4);
    const done = assert.async();
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof FileListLoadErrorMutator) {
          assert.step(`FileListLoadErrorMutator ${mutator.loadError.message}`);
        } else if (mutator instanceof FileListLoadingMutator) {
          assert.step(`FileListLoadingMutator ${mutator.isLoading}`);
        } else {
          assert.step(`${mutator.constructor.name}`);
        }
      },
    };
    const mockApiService = {
      getFileItemList() {
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
  
  test('should call FileListMutator.', function (assert) {
    assert.expect(4);
    const done = assert.async();
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof FileListLoadingMutator) {
          assert.step(`FileListLoadingMutator ${mutator.isLoading}`);
        } else if (mutator instanceof FileListMutator) {
          assert.step(`FileListMutator ${mutator.fileList.length}`);
        } else {
          assert.step(`${mutator.constructor.name}`);
        }
      },
    };
    const mockApiService = {
      getFileItemList() {
        return Promise.resolve({fileList: list});
      },
    };
    
    action.apply(mockStateManager, mockApiService)
      .then(() => {
        assert.verifySteps([
            'FileListLoadingMutator true',
            `FileListMutator ${list.length}`,
            'FileListLoadingMutator false'],
          'Should call mutators in the correct order.');
        done();
      });
  });
});
