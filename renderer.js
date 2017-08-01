// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let shell = require('electron').shell;
let safeApp = require('safe-app');
let ipcRenderer = require('electron').ipcRenderer;

const appInfo = {
	'id': 'net.safe.app.base.mock',
	'name': 'SAFE app base',
	'vendor': 'MaidSafe Ltd.'
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

const listenForAuthReponse = (event, response) => {
	let app = safeApp.fromAuthURI(appInfo, response).then(app => {
		return app;
	});

	app.then(app => {
		return app.mutableData.newRandomPublic(15001)
	}).then(mdata => {
		console.log(mdata);
	})
};

ipcRenderer.on('auth-response', listenForAuthReponse);

const parseUrl = (url) => (
  (url.indexOf('safe-auth://') === -1) ? url.replace('safe-auth:', 'safe-auth://') : url
);

let auth = safeApp.initializeApp(appInfo).then(app => app.auth.genAuthUri(containers, {own_container: false}).then(uri => {
	shell.openExternal(parseUrl(uri.uri));
}));
