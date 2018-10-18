const electron = require('electron')
// Module to control application life.
const app = electron.app
const ipcMain = electron.ipcMain;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const Menu = electron.Menu;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))


  mainWindow.openDevTools();

  mainWindow.webContents.on('context-menu', (e, props) => {
        const { x, y } = props;

        Menu.buildFromTemplate([{
          label: 'Inspect element',
          click() {
            mainWindow.inspectElement(x, y);
          }
        }]).popup(mainWindow);
      });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const sendResponse = (success) => {
  mainWindow.webContents.send('auth-response', success ? success : '');
};

app.on('open-url', function (e, url) {
  sendResponse(url);
});

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  const uri = commandLine[commandLine.length - 1];
  if (commandLine.length >= 2 && uri) {
    sendResponse(uri);
  }
  
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if (shouldQuit) {
  app.quit()
}

ipcMain.on('dir-path', ( event, dirPath ) => {
    let fileObjects = [];
    function readDir(dirPath) {
        let filePaths = fs.readdirSync(dirPath);
        filePaths.map( (filePath) => {
          const fileStats = fs.statSync(path.join(dirPath, filePath));
          if (fileStats.isDirectory()) {
              readDir(path.join(dirPath, filePath));
          } else {
              fileObjects.push( {
                path: path.join(dirPath, filePath),
                buffer: fs.readFileSync(path.join(dirPath, filePath))
              } );
          }
        } );
    }
    readDir(dirPath);
    event.sender.send('dir-contents', fileObjects);
});
