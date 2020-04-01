import Validator from '../../app/services/validator';
import {MinLengthRule, RegexpRule} from '../../app/services/validator/rules';

const {test, module} = QUnit;

export default module('Validator test', function (hook) {
  const validator = new Validator();

  test('should return validation errors.', function (assert) {
    const done = assert.async();
    assert.expect(1);
    validator.validate([{
      name: 'login',
      value: 'bad login',
      rules: [new MinLengthRule(10, 'Wrong length'), new RegexpRule('^([a-zA-Z0-9])',
          'Login should have uppercase or lowercase letters and digits.')]
    }])
        .then(() => assert.notOk(true, 'Should not pass validation.')
        )
        .catch(() => assert.ok(true, 'Should return validation error.')
        );
    done();
  });

  test('should successfully pass validation.', function (assert) {
    const done = assert.async();
    assert.expect(1);
    validator.validate([{
      name: 'login',
      value: 'goodLogin1',
      rules: [new MinLengthRule(8, 'Wrong length'), new RegexpRule('^([a-zA-Z0-9])',
          'Login should have uppercase or lowercase letters and digits.')]
    }])
        .then(() => assert.ok(true, 'Should pass validation.')
        )
        .catch(() => assert.notOk(true, 'Should not return validation error.')
        );
    done();
  });
});
