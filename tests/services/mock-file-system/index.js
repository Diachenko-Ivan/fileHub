import {MockFileSystem} from '../../../app/services/mock-file-system';

const {test, module} = QUnit;

export default module('MockFileSystem test', function (hook) {
  let fileSystem;
  hook.beforeEach(() => {
    fileSystem = new MockFileSystem();
  });


  test('should successfully return one file.', function (assert) {
    const filesBeforeDelete = fileSystem.getFiles();
    const id = filesBeforeDelete[0].id;

    const existentFile = fileSystem.getFile(id);

    const wrongId = 'wrongId';
    const nonExistentFile = fileSystem.getFile(wrongId);

    assert.ok(existentFile,  'Should return file by existing id.');
    assert.notOk(nonExistentFile, 'Should not return file by wrong id.');
  });

  test('should successfully return one folder.', function (assert) {
    const foldersBeforeDelete = fileSystem.getFolders();
    const id = foldersBeforeDelete[0].id;

    const existentFolder = fileSystem.getFolder(id);

    const wrongId = 'wrongId';
    const nonExistentFolder = fileSystem.getFolder(wrongId);

    assert.ok(existentFolder,  'Should return folder by existing id.');
    assert.notOk(nonExistentFolder, 'Should not return folder by wrong id.');
  });
});
