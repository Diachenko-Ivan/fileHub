import {CreateFolderAction} from '../../../../app/states/actions/create-folder-action';
import {NewFolderSourceMutator} from '../../../../app/states/mutator/new-folder-source-mutator';
import {CreateFolderErrorMutator} from '../../../../app/states/mutator/create-folder-error-mutator';
import {NewFolderMutator} from '../../../../app/states/mutator/new-folder-mutator';

const {test, module} = QUnit;

export default module('CreateFolderAction', function () {
  
  test('should call mutators and actions in the correct order after unsuccessful folder creation.', function (assert) {
    assert.expect(4);
    const action = new CreateFolderAction();
    const done = assert.async();
    const error = new Error('error');
    const apiService = {
      createFolder() {
        return Promise.reject(error);
      },
    };
    const stateManager = {
      state: {
        currentFolder: {id: 'qwe'},
      },
      mutate(mutator) {
        if (mutator instanceof NewFolderSourceMutator) {
          assert.step(`NewFolderSourceMutator ${mutator.newFolderSource}`);
        } else if (mutator instanceof CreateFolderErrorMutator) {
          assert.step(`CreateFolderErrorMutator ${mutator.createFolderError.message}`);
        } else {
          assert.step(mutator.constructor.name);
        }
      },
    };
    
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([
          `NewFolderSourceMutator ${stateManager.state.currentFolder}`,
          `CreateFolderErrorMutator ${error.message}`,
          `NewFolderSourceMutator null`,
        ], 'Should call mutators in the correct order.');
        done();
      });
  });
  
  test('should call mutators and actions in the correct order after successful folder creation.', function (assert) {
    assert.expect(5);
    const model = {id: '123', name: 'folder'};
    const done = assert.async();
    const action = new CreateFolderAction();
    const apiService = {
      createFolder() {
        return Promise.resolve(model);
      },
    };
    const stateManager = {
      state: {
        currentFolder: {id: 'qwe'},
      },
      mutate(mutator) {
        if (mutator instanceof NewFolderSourceMutator) {
          assert.step(`NewFolderSourceMutator ${mutator.newFolderSource}`);
        } else if (mutator instanceof NewFolderMutator) {
          assert.step(`NewFolderMutator ${mutator.newFolderId}`);
        } else {
          assert.step(mutator.constructor.name);
        }
      },
      dispatch(action) {
        assert.step(action.constructor.name);
        return Promise.resolve();
      },
    };
    
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([
          `NewFolderSourceMutator ${stateManager.state.currentFolder}`,
          'GetFolderContentAction',
          `NewFolderMutator ${model.id}`,
          `NewFolderSourceMutator null`,
        ], 'Should call mutators and actions in the correct order.');
        done();
      });
  });
});
