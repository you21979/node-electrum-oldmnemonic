// for bitcoinjs-lib@3
"use strict";
const oldmnemonic = require("electrum-oldmnemonic");
const bitcoin = require("bitcoinjs-lib")

const monacoin = {
    messagePrefix: '\x18Monacoin Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x32,
    scriptHash: 0x37,
    wif: 0xb0
};

const words = ""

const oldseedhex = oldmnemonic.decode(words);
const m = bitcoin.HDNode.fromSeedBuffer(Buffer.from(oldseedhex, 'hex'), monacoin)
console.log(m.derivePath("m/0'/0/0").getAddress())


