# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop astracore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/astracore-node.git
git clone git@github.com:<yourusername>/astracore-lib.git
```

To develop astra or to compile from source:

```bash
git clone git@github.com:<yourusername>/astracoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See astra documentation for building astra on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd bitcore-lib
npm install
cd ../bitcore-node
npm install
```
**Note**: If you get a message about not being able to download astra distribution, you'll need to compile astrad from source, and setup your configuration to use that version.


We now will setup symlinks in `astracore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf astracore-lib
ln -s ~/astracore-lib
rm -rf astrad-rpc
ln -s ~/astrad-rpc
```

And if you're compiling or developing astracoin:
```bash
cd ../bin
ln -sf ~/astra/src/astrad
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd astracore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/astrad.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/astrad.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch astracore-node.json
touch package.json
```

Edit `astracore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "astrad",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "astrad": {
      "spawn": {
        "datadir": "/home/<youruser>/.astra",
        "exec": "/home/<youruser>/astra/src/astrad"
      }
    }
  }
}
```

**Note**: To install services [astra-insight-api](https://github.com/AstraCore/insight-api) and [astra-explorer](https://github.com/AstraCore/astra-explorer) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/astracore-lib
ln -s ~/astracore-node
ln -s ~/astra-insight-api
ln -s ~/astra-explorer
```

Make sure that the `<datadir>/astra.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=9888
reindex=1
gen=0
addrindex=1
logevents=1
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../astracore-node/bin/astracore-node start
```