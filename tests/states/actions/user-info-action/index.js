import {GetUserInfoAction} from '../../../../app/states/actions/user-info-action';
import {UserInfoLoadingMutator} from '../../../../app/states/mutator/user-info-loading-mutator';
import {UserErrorMutator} from '../../../../app/states/mutator/user-error-mutator';
import {UserMutator} from '../../../../app/states/mutator/user-mutator';

const {test, module} = QUnit;

export default module('UserInfoAction', function () {
  const action = new GetUserInfoAction();
  
  test('should call mutators in the correct order after user error.', async function (assert) {
    assert.expect(4);
    const error = new Error('User is unauthorized');
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof UserInfoLoadingMutator) {
          assert.step(`UserInfoLoadingMutator ${mutator.isUserLoading}`);
        } else if (mutator instanceof UserErrorMutator) {
          assert.step(`UserErrorMutator ${mutator.userError.message}`);
        } else {
          assert.step(`${mutator.constructor.name}`);
        }
      },
    };
    const mockApiService = {
      getUserInfo() {
        return Promise.reject(error);
      },
    };
    
    await action.apply(mockStateManager, mockApiService);
    assert.verifySteps([
      `UserInfoLoadingMutator true`,
      `UserErrorMutator ${error.message}`,
      `UserInfoLoadingMutator false`,], 'Should call mutators in the correct order.');
  });
  
  test('should call mutators in the correct order after successful getting of user.', async function (assert) {
    const user = {name: 'John'};
    assert.expect(4);
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof UserInfoLoadingMutator) {
          assert.step(`UserInfoLoadingMutator ${mutator.isUserLoading}`);
        } else if (mutator instanceof UserMutator) {
          assert.step(`UserMutator ${mutator.user.name}`);
        } else {
          assert.step(`${mutator.constructor.name}`);
        }
      },
    };
    const mockApiService = {
      getUserInfo() {
        return Promise.resolve(user);
      },
    };
    
    await action.apply(mockStateManager, mockApiService);
    assert.verifySteps([
      `UserInfoLoadingMutator true`,
      `UserInfoLoadingMutator false`,
      `UserMutator ${user.name}`,], 'Should call mutators in the correct order.');
  });
});
