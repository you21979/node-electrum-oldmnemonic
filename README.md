# node-electrum-oldmnemonic

```
npm i electrum-oldmnemonic
```

## restore seed

```
"use strict";
const oldmnemonic = require("electrum-oldmnemonic");

const words = 'hardly point goal hallway patience key stone difference ready caught listen fact';
const oldseedhex = oldmnemonic.mn_decode(words.split(' '));
```
