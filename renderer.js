// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let shell = require('electron').shell;
let safeApp = require('safe-app');

const appInfo = {
	'id': 'net.safe.upload.mock',
	'name': 'Host Website',
	'vendor': 'hunterlester'
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

const parseUrl = (url) => (
  (url.indexOf('safe-auth://') === -1) ? url.replace('safe-auth:', 'safe-auth://') : url
);

let auth = safeApp.initializeApp(appInfo).then(app => app.auth.genAuthUri(containers, {own_container: true}).then(uri => {
	shell.openExternal(parseUrl(uri.uri));
	return app.mutableData.newRandomPublic(15003)
        .then((md) => {
					console.log(md);
					return md;
				})
}));
