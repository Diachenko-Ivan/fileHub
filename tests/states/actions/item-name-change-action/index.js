import {RenameItemAction} from '../../../../app/states/actions/item-name-change-action';
import {RenamingItemsMutator} from '../../../../app/states/mutator/rename-process-mutator';
import {RenameErrorMutator} from '../../../../app/states/mutator/rename-error-mutator';
import {RenamedItemsMutator} from '../../../../app/states/mutator/rename-finished-mutator';
import {AuthenticationError} from '../../../../app/models/errors/authentication-error';

const {test, module} = QUnit;

export default module('RenameItemAction test', function () {
  
  test('should call mutators and actions in the correct order after unsuccessful rename.', function (assert) {
    assert.expect(5);
    const model = {id: '123', name: 'folder'};
    const action = new RenameItemAction(model);
    const done = assert.async();
    const apiService = {
      renameItem() {
        return Promise.reject();
      },
    };
    const stateManager = {
      state: {
        currentFolder: {id: 'qwe'},
      },
      mutate(mutator) {
        if (mutator instanceof RenamingItemsMutator) {
          assert.step(`RenamingItemMutator ${mutator.itemId}`);
        } else if (mutator instanceof RenameErrorMutator) {
          assert.step(`RenameErrorMutator ${mutator.renameErrorObject.model.name}`);
        } else if (mutator instanceof RenamedItemsMutator) {
          assert.step(`RenamedItemsMutator ${mutator.itemId}`);
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
          `RenamingItemMutator ${model.id}`,
          `RenameErrorMutator ${model.name}`,
          `RenamedItemsMutator ${model.id}`,
          'GetFolderContentAction',
        ], 'Should call mutators and actions in the correct order.');
        done();
      });
  });
  
  test('should call mutators in the correct order and do not call GetFolderContentAction after unsuccessful rename.', function (assert) {
    assert.expect(4);
    const model = {id: '123', name: 'folder'};
    const action = new RenameItemAction(model);
    const done = assert.async();
    const apiService = {
      renameItem() {
        return Promise.reject(new AuthenticationError());
      },
    };
    const stateManager = {
      state: {
        currentFolder: {id: 'qwe'},
      },
      mutate(mutator) {
        if (mutator instanceof RenamingItemsMutator) {
          assert.step(`RenamingItemMutator ${mutator.itemId}`);
        } else if (mutator instanceof RenameErrorMutator) {
          assert.step(`RenameErrorMutator ${mutator.renameErrorObject.model.name}`);
        } else if (mutator instanceof RenamedItemsMutator) {
          assert.step(`RenamedItemsMutator ${mutator.itemId}`);
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
          `RenamingItemMutator ${model.id}`,
          `RenameErrorMutator ${model.name}`,
          `RenamedItemsMutator ${model.id}`,
        ], 'Should call mutators in the correct order.');
        done();
      });
  });
  
  test('should call mutators and actions in the correct order after successful rename.', function (assert) {
    assert.expect(4);
    const model = {id: '123', name: 'folder'};
    const done = assert.async();
    const action = new RenameItemAction(model);
    const apiService = {
      renameItem() {
        return Promise.resolve();
      },
    };
    const stateManager = {
      state: {
        currentFolder: {id: 'qwe'},
      },
      mutate(mutator) {
        if (mutator instanceof RenamingItemsMutator) {
          assert.step(`RenamingItemMutator ${mutator.itemId}`);
        } else if (mutator instanceof RenamedItemsMutator) {
          assert.step(`RenamedItemsMutator ${mutator.itemId}`);
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
          `RenamingItemMutator ${model.id}`,
          `RenamedItemsMutator ${model.id}`,
          'GetFolderContentAction',
        ], 'Should call mutators and actions in the correct order.');
        done();
      });
  });
  
  test('should call mutators in the correct order and do not call GetFolderContentAction after successful rename.', function (assert) {
    assert.expect(3);
    const model = {id: '123', name: 'folder'};
    const done = assert.async();
    const action = new RenameItemAction(model);
    const apiService = {
      renameItem() {
        return Promise.resolve();
      },
    };
    const stateManager = {
      state: {
        currentFolder: {id: 'qwe'},
      },
      mutate(mutator) {
        if (mutator instanceof RenamingItemsMutator) {
          assert.step(`RenamingItemMutator ${mutator.itemId}`);
        } else if (mutator instanceof RenamedItemsMutator) {
          assert.step(`RenamedItemsMutator ${mutator.itemId}`);
          this.state.currentFolder.id = '123';
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
          `RenamingItemMutator ${model.id}`,
          `RenamedItemsMutator ${model.id}`,
        ], 'Should call mutators  in the correct order.');
        done();
      });
  });
});
