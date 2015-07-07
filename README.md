# door

RFID doorlock application.

The application is broken up into two parts. `frontend/` is a React web application built using WebPack. `backend/` is an io.js (basically Node.js with ES6 support) application using Express for routing.

The application reads a JSON file of user RFID access codes. The expected location is in the current user's home directory (e.g. `~/users.json`).

The `users.json` file is structured like:

```js
[
  {
    "name": "John Smith",
    "code": "00000123456"
  },
  // etc...
]
```

The backend wraps the file in a RESTful JSON API that the frontend consumes to list and manage cards.


## Setup

1. `brew install nvm` to setup NVM to manage node/iojs versions.
2. `nvm install` to install the required iojs version for this app.
3. `nvm use` to use the newly installed version of iojs.
4. `npm install` to install application dependencies (and dependencies for `frontend` and `backend`)


## Development

- `npm run watch` runs dev server and tests.
- `npm test` runs test suite once.
- `npm run watch-test` runs just the test suite, watching for changes.
- `npm run` to see a list of other tasks.

## Setup On Raspberry Pi

```bash
# Get everything up to date:
sudo apt-get update
sudo apt-get upgrade

# Install npm and nvm:
sudo apt-get install git npm
git clone https://github.com/creationix/nvm.git ~/.nvm
echo "source ~/.nvm/nvm.sh" >> ~/.bashrc
echo "source ~/.nvm/nvm.sh" >> ~/.profile
sudo reboot

# Setup the door application
git clone https://github.com/BuiltByBig/door.git ~/door
cd ~/door
nvm install
nvm use
npm install
```


## TODO

- [x] Read JSON from filesystem.
- [x] RESTful API to read and update JSON file.
- [ ] Coverage tool.
- [ ] Dist build for deployment.
