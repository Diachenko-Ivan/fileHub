import {RemoveStatePropertyMutator} from '../../../../app/states/mutator/remove-state-property-mutator';
import {RemoveStatePropertyAction} from '../../../../app/states/actions/remove-state-property-action';

const {test, module} = QUnit;

export default module('RemoveStatePropertyMutator', function () {
  
  test('should call RemoveStatePropertyMutator.', function (assert) {
    const action = new RemoveStatePropertyAction('userError');
    assert.expect(2);
    const done = assert.async();
    const mockStateManager = {
      mutate(mutator){
        assert.step(`${mutator.constructor.name} ${mutator.propertyName}`)
      }
    };
    action.apply(mockStateManager, {})
      .then(() => {
        assert.verifySteps([`RemoveStatePropertyMutator userError`], 'Should call RemoveStatePropertyMutator.');
        done();
      });
  });
});
