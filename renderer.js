// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const shell = require('electron').shell;
const remote = require('electron').remote;
const safeApp = require('@maidsafe/safe-node-app');
const ipcRenderer = require('electron').ipcRenderer;
const isDevMode = process.execPath.match(/[\\/]electron/);
const app = remote.app;
const cwd = process.cwd();
const electronExt = process.platform === 'win32' ? '.cmd' : '';

const appInfo = {
  id: 'net.safe.app.base.mock',
  name: 'SAFE app base',
  vendor: 'MaidSafe Ltd.',
  customExecPath: isDevMode ? [`${process.execPath}`, `${app.getAppPath()}`] : [app.getPath('exe')]
}

// OSX: Add bundle for electron in dev mode
if (isDevMode && process.platform === 'darwin') {
  appInfo.bundle = 'com.github.electron';
}

const containers = {
  _public: [
    'Read',
    'Insert',
    'Update',
    'Delete',
    'ManagePermissions'
  ],
  _publicNames: [
    'Read',
    'Insert',
    'Update',
    'Delete',
    'ManagePermissions'
  ]
};

const listenForAuthReponse = async (event, response) =>
{
	const app = await safeApp.fromAuthUri(appInfo, response, null, { forceUseMock: true });
	const mData = await app.mutableData.newRandomPublic(15001);
	console.log(mData);
        return;
};

ipcRenderer.on('auth-response', listenForAuthReponse);

const parseUrl = (url) => (
  (url.indexOf('safe-auth://') === -1) ? url.replace('safe-auth:', 'safe-auth://') : url
);

const init = async ( ) =>
{
    const app = await safeApp.initialiseApp(appInfo);
    const authUri = await app.auth.genAuthUri(containers, {own_container: false});
    shell.openExternal(parseUrl(authUri.uri));
};

init();


// let auth = safeApp.initializeApp(appInfo).then(app => app.auth.loginForTest()).then(console.log);
