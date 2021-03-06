import RouterTest from './router-test.js';
import ButtonTest from './component/button';
import FormInputTest from './component/form-input';
import LoginFormTest from './component/form-login';
import ValidatorTest from './validator';
import ApiServiceTest from './services/api-service.js';
import UserDetails from './component/user-details';
import FileItemTest from './component/file-item/file-item-icon';
import FileTest from './component/file-item/file';
import FolderTest from './component/file-item/folder';
import FileItemListTest from './component/file-list';
import GetFolderContentActionTest from './states/actions/get-folder-content-action';
import FileListLoadingMutator from './states/mutator/file-list-loading-mutator';
import FileListMutator from './states/mutator/file-list-mutator';
import FileListErrorMutator from './states/mutator/file-list-load-error-mutator';
import StateManagerTest from './states/state-manager';
import DirectoryPathTest from './component/directory-path'
import UserInfoActionTest from './states/actions/user-info-action'
import UserMutatorTest from './states/mutator/user-mutator'
import RemoveItemAction from './states/actions/remove-item-action'
import StorageServiceTest from './services/storage-service'
import RenameActionTest from './states/actions/item-name-change-action'
import DownloadFileActionTest from './states/actions/download-action'
import FileHubPageTest from './pages/filehub-page'
import DynamicRouteChangeActionTest from './states/actions/dynamic-route-change-action'
import LocationMutatorTest from './states/mutator/location-mutator'
import FolderMutatorTest from './states/mutator/folder-mutator'
import GetFolderActionTest from './states/actions/get-folder-action'
import FolderLoadingMutatorTest from './states/mutator/folder-loading-mutator'
import FolderLoadErrorMutatorTest from './states/mutator/folder-load-error-mutator'
import LoginPageTest from './pages/login-page'
import RegistrationPageTest from './pages/registration-page'
import ErrorPageTest from './pages/error-page'
import RegistrationFormTest from './component/form-registration'
import RemovingItemsMutatorTest from './states/mutator/remove-items-mutator'
import RemoveItemErrorMutatorTest from './states/mutator/remove-item-error-mutator'
import RemovedItemsMutatorTest from './states/mutator/removed-items-mutator'
import UploadActionTest from './states/actions/upload-file-action'
import UploadProcessMutatorTest from './states/mutator/upload-finished-mutator'
import UploadFinishedMutatorTest from './states/mutator/upload-process-mutator'
import UploadErrorMutatorTest from './states/mutator/upload-error-mutator'
import UserErrorMutatorTest from './states/mutator/user-error-mutator'
import LogOutAction from './states/actions/log-out-action'
import DownloadErrorMutatorTest from './states/mutator/download-error-mutator'
import DownloadProcessMutatorTest from './states/mutator/download-process-mutator'
import DownloadFinishedMutatorTest from './states/mutator/download-finished-mutator'
import RenameProcessMutatorTest from './states/mutator/upload-finished-mutator'
import RenameFinishedMutatorTest from './states/mutator/upload-process-mutator'
import RenameErrorMutatorTest from './states/mutator/upload-error-mutator'
import NewFolderMutatorTest from './states/mutator/new-folder-mutator'
import NewFolderSourceMutatorTest from './states/mutator/new-folder-source-mutator'
import CreateFolderErrorMutatorTest from './states/mutator/create-folder-error-mutator'
import CreateFolderActionTest from './states/actions/create-folder-action'
import UserLoadingMutatorTest from './states/mutator/user-info-loading-mutator'
import RemoveStatePropertyAction from './states/actions/remove-state-property-action'
import RemoveStatePropertyMutator from './states/mutator/remove-state-property-mutator'
