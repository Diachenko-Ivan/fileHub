import {ClearErrorAction} from '../../../../app/states/actions/remove-state-property-action';

const {test, module} = QUnit;

export default module('ClearErrorAction', function () {
  
  test('should call RemoveStatePropertyMutator.', function (assert) {
    const action = new ClearErrorAction('userError');
    assert.expect(2);
    const done = assert.async();
    const mockStateManager = {
      mutate(mutator){
        assert.step(`${mutator.constructor.name} ${mutator.propertyName}`)
      }
    };
    action.apply(mockStateManager, {})
      .then(() => {
        assert.verifySteps([`ClearErrorMutator userError`], 'Should call RemoveStatePropertyMutator.');
        done();
      });
  });
});
