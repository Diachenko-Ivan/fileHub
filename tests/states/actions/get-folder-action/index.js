import {FolderLoadingMutator} from '../../../../app/states/mutator/folder-loading-mutator';
import {GetFolderAction} from '../../../../app/states/actions/get-folder-action';
import {FolderMutator} from '../../../../app/states/mutator/folder-mutator';
import {FolderLoadErrorMutator} from '../../../../app/states/mutator/folder-load-error-mutator';

const {test, module} = QUnit;
export default module('GetFolderAction', function () {
  
  test('should call load error mutator.', function (assert) {
    const action = new GetFolderAction('qw');
    assert.expect(4);
    const done = assert.async();
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof FolderLoadErrorMutator) {
          assert.step(`FolderLoadErrorMutator ${mutator.folderLoadError.message}`);
        } else if (mutator instanceof FolderLoadingMutator) {
          assert.step(`FolderLoadingMutator ${mutator.isFolderLoading}`);
        } else {
          assert.step(mutator.constructor.name);
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
            'FolderLoadingMutator true',
            'FolderLoadErrorMutator error',
            'FolderLoadingMutator false'],
          'Should call mutators in the correct order.');
        done();
      });
  });
  
  test('should call folder mutator.', function (assert) {
    const action = new GetFolderAction('qw');
    assert.expect(4);
    const done = assert.async();
    const folder = {name: 'docs', id: '123'};
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof FolderMutator) {
          assert.step(`FolderMutator ${mutator.currentFolder}`);
        } else if (mutator instanceof FolderLoadingMutator) {
          assert.step(`FolderLoadingMutator ${mutator.isFolderLoading}`);
        } else {
          assert.step(mutator.constructor.name);
        }
      },
    };
    const mockApiService = {
      getFolder() {
        return Promise.resolve(folder);
      },
    };
    
    action.apply(mockStateManager, mockApiService)
      .then(() => {
        assert.verifySteps([
            'FolderLoadingMutator true',
            'FolderLoadingMutator false',
            `FolderMutator ${folder}`,],
          'Should call mutators in the correct order.');
        done();
      });
  });
});
