import {DynamicRouteChangeAction} from '../../../../app/states/actions/dynamic-route-change-action';
import {LocationMutator} from '../../../../app/states/mutator/location-mutator';

const {test, module} = QUnit;
export default module('DynamicRouteChangeAction', function (hook) {
  
  test('should call LocationMutator.', function (assert) {
    assert.expect(2);
    const done = assert.async();
    const staticPart = '/folder/id';
    const param = {id: 'asda'};
    const action = new DynamicRouteChangeAction(staticPart, param);
    const stateManager = {
      mutate(mutator) {
        if (mutator instanceof LocationMutator)
          assert.step(`LocationMutator ${mutator.location} ${mutator.locationParam}`);
      },
    };
    action.apply(stateManager, {})
      .then(() => {
        assert.verifySteps([`LocationMutator ${staticPart} ${param}`], 'Should call LocationMutator with correct params.');
        done();
      });
  });
});
