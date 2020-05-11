import {LocationMutator} from '../../../../app/states/mutator/location-mutator';

const {test, module} = QUnit;
export default module('LocationMutator', function (hook) {
  let state;
  
  test('should set correct location and location param to state.', function (assert) {
    state = {
      location: '',
      locationParam: {},
    };
    const location = 'folder/root';
    const locationParam = {id: 'root'};
    const mutator = new LocationMutator(location, locationParam);
    
    mutator.apply(state);
    assert.strictEqual(state.location, location, 'Should set correct location value.');
    assert.deepEqual(state.locationParam, locationParam, 'Should set correct location param value.');
  });
});
