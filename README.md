Astracore Node
============

A ASTRA full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services.

## Getting Started

1. Install nvm https://github.com/creationix/nvm  

    ```bash
    nvm i v6
    nvm use v6
    ```  
2. Install mongo https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/  

3. Install astra-bitcore https://github.com/216k155/astra-bitcore - with ZMQ !

    ```bash
    # with ZMQ
    sudo apt-get install libzmq3-dev 
    ```  
4. Install astracore-node

    ```bash
    npm i https://github.com/216k155/astracore-node.git#master

    $(npm bin)/astracore-node create mynode

    cd mynode

    ```  
5. Edit astracore-node.json

    ```json
    {
      "network": "livenet",
      "port": 3001,
      "services": [
	    "astrad",
        "web"
      ],
      "servicesConfig": {
        "astrad": {
          "spawn": {
            "datadir": "/home/user/.astra",
            "exec": "/home/user/astra-bitcore/src/astrad"
          }
        }
      }
	}
    ```  
6. Edit astra.conf

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
7. Run Node  

    ```
    $(npm bin)/astracore-node start
    ```  

## Add-on Services

There are several add-on services available to extend the functionality of Astracore:

- [ASTRA Insight API](https://github.com/216k155/insight-api)
- [ASTRA Explorer](https://github.com/216k155/astra-explorer)

## Contributing



## License
