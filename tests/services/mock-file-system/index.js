import {MockFileSystem} from '../../../app/services/mock-file-system';

const {test, module} = QUnit;

export default module('MockFileSystem test', function (hook) {
  let fileSystem;
  hook.beforeEach(() => {
    fileSystem = new MockFileSystem();
  });

  test('should successfully delete one folder.', function (assert) {
    const foldersBeforeDelete = fileSystem.getFolders();
    const startNumOfFolders = foldersBeforeDelete.length;

    const id = foldersBeforeDelete[0].id;

    fileSystem.deleteFolder(id);

    const foldersAfterDelete = fileSystem.getFolders();
    const numOfFoldersAfterDelete = foldersAfterDelete.length;

    assert.strictEqual(startNumOfFolders - 1, numOfFoldersAfterDelete, 'Should return folder list that is less by 1.');
    assert.notOk(foldersAfterDelete.find((folder) => folder.id === id), 'Should delete folder with right id.');
  });

  test('should successfully delete one file.', function (assert) {
    const filesBeforeDelete = fileSystem.getFiles();
    const startNumOfFolders = filesBeforeDelete.length;

    const id = filesBeforeDelete[0].id;

    fileSystem.deleteFile(id);

    const filesAfterDelete = fileSystem.getFiles();
    const numOfFoldersAfterDelete = filesAfterDelete.length;

    assert.strictEqual(startNumOfFolders - 1, numOfFoldersAfterDelete, 'Should return file list that is less by 1.');
    assert.notOk(filesAfterDelete.find((folder) => folder.id === id), 'Should delete file with right id.');
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
    const filesBeforeDelete = fileSystem.getFiles();
    const id = filesBeforeDelete[0].id;

    const existentFolder = fileSystem.getFile(id);

    const wrongId = 'wrongId';
    const nonExistentFolder = fileSystem.getFile(wrongId);

    assert.ok(existentFolder,  'Should return folder by existing id.');
    assert.notOk(nonExistentFolder, 'Should not return folder by wrong id.');
  });
});
