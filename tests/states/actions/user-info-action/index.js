import {UserInfoAction} from '../../../../app/states/actions/user-info-action';

const {test, module} = QUnit;

export default module('UserInfoAction', function () {
  const action = new UserInfoAction();
  
  test('should call user error mutator.', async function (assert) {
    assert.expect(2);
    const error = new Error('User is unauthorized');
    const mockStateManager = {
      mutate(mutator) {
        assert.step(`${mutator.constructor.name} ${mutator.userError.message}`);
      },
    };
    const mockApiService = {
      getUserInfo() {
        return Promise.reject(error);
      },
    };
    
    await action.apply(mockStateManager, mockApiService);
    assert.verifySteps([`UserErrorMutator ${error.message}`], 'Should call user error mutator.');
  });
  
  test('should call user mutator.', async function (assert) {
    const user = {name: 'John'};
    assert.expect(2);
    const mockStateManager = {
      mutate(mutator) {
        assert.step(`${mutator.constructor.name} ${mutator.user.name}`);
      },
    };
    const mockApiService = {
      getUserInfo() {
        return Promise.resolve(user);
      },
    };
    
    await action.apply(mockStateManager, mockApiService);
    assert.verifySteps([`UserMutator ${user.name}`], 'Should call user mutator.');
  });
});
