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
5. `cp backend/.env.example backend/.env` and edit port and authentication username and password.


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
sudo apt-get install git npm psmisc
git clone https://github.com/creationix/nvm.git ~/.nvm
echo "source ~/.nvm/nvm.sh" >> ~/.bashrc
echo "source ~/.nvm/nvm.sh" >> ~/.profile
sudo reboot


# Setup the door application
git clone https://github.com/BuiltByBig/door.git ~/door
cd ~/door
nvm install
nvm use
nvm alias default iojs
npm install

## Run the application
npm run build
npm start
```

### Run the application on boot

```bash
npm install forever -g
sudo cp etc/init.sh /etc/init.d/door
sudo chmod 755 /etc/init.d/door
sudo update-rc.d door defaults
```


### Change hostname (optional)

Setup network name which allows you to visi "raspberrypi.local" on your network:

```bash
sudo apt-get install avahi-daemon
```

To change your device hostname, edit `/etc/hosts` (e.g. `sudo nano /etc/hosts`) and **change `raspberrypi` to whatever you want** (e.g. `door`) on the very last line:

```
127.0.1.1      raspberrypi
```

Now change `/etc/hostname` to match what you changed `raspberrypi` to above.

Now commit the changes and reboot:

```bash
sudo /etc/init.d/hostname.sh
sudo reboot
```

Now you should be able to go to http://door.local and see the application running.


## Notes / Resources

- [Mounting Raspberry Pi images on OSX](http://pi.gbaman.info/?p=328)
- [Setup wifi on Debian](https://wiki.debian.org/WiFi/HowToUse#Command_Line) (particularly the WPA section)
- Restart wifi on Debian: `ifdown wlan0 && ifup wlan0`
- [Set Locale on Debian](https://bbs.archlinux.org/viewtopic.php?id=156845)


## TODO

- [x] Read JSON from filesystem.
- [x] RESTful API to read and update JSON file.
- [ ] Coverage tool.
- [x] Dist build for deployment.
