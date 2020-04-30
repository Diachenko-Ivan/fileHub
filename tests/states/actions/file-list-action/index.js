import {GetFolderAction} from '../../../../app/states/actions/file-list-action';
import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';
import {FileListMutator} from '../../../../app/states/mutator/file-list-mutator';
import {FolderMutator} from '../../../../app/states/mutator/folder-mutator';
import {FileListLoadingMutator} from '../../../../app/states/mutator/file-list-loading-mutator';

const {test, module} = QUnit;

export default module('GetFolderAction', function (hook) {
  
  test('should call load error mutator.', function (assert) {
    const action = new GetFolderAction('qw');
    assert.expect(4);
    const done = assert.async();
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof FileListLoadErrorMutator) {
          assert.step(`FileListLoadErrorMutator ${mutator.loadError.message}`);
        } else if (mutator instanceof FileListLoadingMutator) {
          assert.step(`FileListLoadingMutator ${mutator.isLoading}`);
        }
      },
    };
    const mockApiService = {
      getFolder() {
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
  
  test('should call folder mutator.', function (assert) {
    const action = new GetFolderAction('qw');
    assert.expect(5);
    const done = assert.async();
    const folder = {name: 'doc'};
    const content = [{name: 'file.pdf'}];
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof FolderMutator) {
          assert.step(`FolderMutator ${mutator.currentFolder}`);
        } else if (mutator instanceof FileListMutator) {
          assert.step(`FileListMutator ${mutator.fileList}`);
        } else if (mutator instanceof FileListLoadingMutator) {
          assert.step(`FileListLoadingMutator ${mutator.isLoading}`);
        }
      },
    };
    const mockApiService = {
      getFolder() {
        return Promise.resolve(folder);
      },
      getFolderContent() {
        return Promise.resolve(content);
      },
    };
    
    action.apply(mockStateManager, mockApiService)
      .then(()=>{
        assert.verifySteps([
            'FileListLoadingMutator true',
            `FolderMutator ${folder}`,
            `FileListMutator ${content}`,
            'FileListLoadingMutator false'],
          'Should call mutators in the correct order.');
        done();
      });
  });
});
