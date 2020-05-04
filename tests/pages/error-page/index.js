import {ErrorPage} from '../../../app/pages/error-page';

const {test, module} = QUnit;

export default module('ErrorPage test', function (hook) {
  let fixture;
  
  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });
  
  test('should render error page.', function (assert) {
    new ErrorPage(fixture, 404, '');
    
    const errorPage = fixture.firstElementChild;
    
    assert.ok(errorPage, 'Should successfully render error page.');
  });
});
