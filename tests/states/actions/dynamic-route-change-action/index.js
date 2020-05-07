import {DynamicRouteChangeAction} from '../../../../app/states/actions/dynamic-route-change-action';

const {test, module} = QUnit;
export default module('DynamicRouteChangeAction', function () {
  
  test('should call LocationMutator.', function (assert) {
    assert.expect(2);
    const done = assert.async();
    const staticPart = '/folder/id';
    const param = {id: 'asda'};
    const action = new DynamicRouteChangeAction(staticPart, param);
    const stateManager = {
      mutate(mutator) {
        assert.step(`${mutator.constructor.name} ${mutator.location} ${mutator.locationParam}`);
      },
    };
    action.apply(stateManager, {})
      .then(() => {
        assert.verifySteps([`LocationMutator ${staticPart} ${param}`], 'Should call LocationMutator with correct params.');
        done();
      });
  });
});
