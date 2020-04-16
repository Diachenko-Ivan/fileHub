import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';
import {UserInfoAction} from '../../../../app/states/actions/user-info-action';
import {UserMutator} from '../../../../app/states/mutator/user-mutator';

const {test, module} = QUnit;

export default module('UserInfoAction test', function (hook) {
  const action = new UserInfoAction();

  test('should call load error mutator.', function (assert) {
    assert.expect(1);
    const error = new Error();
    const mockStateManager = {
      mutate(loadErrorMutator) {
        if (loadErrorMutator instanceof FileListLoadErrorMutator) {
          assert.ok(true, 'Should call load error mutator.');
        }
      }
    };
    const mockApiService = {
      getUserInfo() {
        return Promise.reject(error);
      }
    };

    action.apply(mockStateManager, mockApiService);
  });

  test('should call user mutator.', function (assert) {
    const user = {name: 'John'};
    assert.expect(1);
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof UserMutator
          && mutator.user === user) {
          assert.ok(true, 'Should call user mutator.');
        }
      }
    };
    const mockApiService = {
      getUserInfo() {
        return Promise.resolve(user);
      }
    };

    action.apply(mockStateManager, mockApiService);
  });
});
