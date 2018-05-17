This is a minimal Electron application based on the [Quick Start Guide](http://electron.atom.io/docs/tutorial/quick-start) within the Electron documentation.

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/hunterlester/safe-app-base.git
# Go into the repository
cd safe-app-base
# Set env variable for mock routing
*nix: `set NODE_ENV='dev'`, Windows: `$env:NODE_ENV = 'dev'`
# Install dependencies
npm install
# Use npm start to verify that there are no errors in terminal before packaging
npm run start
# Packaging
npm run package
# Then find newly output directory in the root of this project starting with `base-safe-app...` to find executable
```

Take a look at [Electron packager documentation](https://github.com/electron-userland/electron-packager) for further reading.

Electron package can infer your arch and platform, if you simply run:  
`electron-packager .`

## Resources for Learning Electron

- [electron.atom.io/docs](http://electron.atom.io/docs) - all of Electron's documentation
- [electron.atom.io/community/#boilerplates](http://electron.atom.io/community/#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs
