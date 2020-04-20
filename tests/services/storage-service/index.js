import {StorageService} from '../../../app/services/storage-service';

const {test, module} = QUnit;

export default module('StorageService test', function (hook) {

  test('should check the call of getItem.', function (assert) {
    const mockStorage = {
      getItem(key) {
        assert.step(key);
      }
    };
    const storageService = new StorageService(mockStorage);
    storageService.getItem('Get')

    assert.verifySteps(['Get'], 'Should invoke storage.getItem().');
  });

  test('should check the call of setItem.', function (assert) {
    const mockStorage = {
      setItem() {
        assert.step('Set');
      }
    };
    const storageService = new StorageService(mockStorage);
    storageService.setItem('', '')

    assert.verifySteps(['Set'], 'Should invoke storage.setItem().');
  });

  test('should check the call of removeItem.', function (assert) {
    const mockStorage = {
      removeItem(key) {
        assert.step('Remove');
      }
    };
    const storageService = new StorageService(mockStorage);
    storageService.removeItem('');

    assert.verifySteps(['Remove'], 'Should invoke storage.setItem().');
  });
});
