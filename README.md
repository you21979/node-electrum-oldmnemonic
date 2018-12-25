# node-electrum-oldmnemonic

## install

[![NPM](https://nodei.co/npm/electrum-oldmnemonic.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/electrum-oldmnemonic)  
[![Build Status](https://secure.travis-ci.org/you21979/node-electrum-oldmnemonic.png?branch=master)](https://travis-ci.org/you21979/node-electrum-oldmnemonic)
[![Coverage Status](https://coveralls.io/repos/github/you21979/node-electrum-oldmnemonic/badge.svg?branch=master)](https://coveralls.io/github/you21979/node-electrum-oldmnemonic?branch=master)


```
npm i electrum-oldmnemonic
```

## target system mnemonic words

* from electrum 1.x
* from counterparty wallet
* from monaparty wallet

## restore seed

```
const oldmnemonic = require("electrum-oldmnemonic");

const words = 'hardly point goal hallway patience key stone difference ready caught listen fact';
const oldseedhex = oldmnemonic.decode(words);
```

