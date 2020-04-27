import {StorageService} from '../../../app/services/storage-service';

const {test, module} = QUnit;

export default module('StorageService', function () {
  
  test('should call getItem.', function (assert) {
    const testKey = 'Get';
    const mockStorage = {
      getItem(key) {
        assert.strictEqual(key, testKey, 'Should get value by correct key.');
      },
    };
    const storageService = new StorageService(mockStorage);
    storageService.getItem(testKey);
  });
  
  test('should call setItem.', function (assert) {
    const testKey = 'Key';
    const testValue = 'Value';
    const mockStorage = {
      setItem(key, value) {
        assert.strictEqual(key, testKey, 'Should accept correct key.');
        assert.strictEqual(value, testValue, 'Should set correct value.');
      },
    };
    const storageService = new StorageService(mockStorage);
    storageService.setItem(testKey, testValue);
  });
  
  test('should call removeItem.', function (assert) {
    const testKey = 'Key';
    const mockStorage = {
      removeItem(key) {
        assert.strictEqual(key, testKey, 'Should accept correct key.');
      },
    };
    const storageService = new StorageService(mockStorage);
    storageService.removeItem(testKey);
  });
});
