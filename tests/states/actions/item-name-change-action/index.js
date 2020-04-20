import {GetFolderAction} from '../../../../app/states/actions/file-list-action';
import {RenameItemAction} from '../../../../app/states/actions/item-name-change-action';

const {test, module} = QUnit;

export default module('RenameItemAction test', function (hook) {

  test('should call load error mutator.', function (assert) {
    assert.expect(1);
    const action = new RenameItemAction({name:'folder'});
    const apiService={
      renameItem(){
        return Promise.reject();
      }
    }
    const stateManager={
      mutate(){
        assert.ok(true, 'Should call load error mutator');
        }
      }

    action.apply(stateManager, apiService);
  });
})
