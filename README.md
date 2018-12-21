# node-electrum-oldmnemonic

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

