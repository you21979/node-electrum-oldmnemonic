import * as assert from 'assert'
import { mn_encode, mn_decode, valid_word } from '../lib/electrum_seed'

//const crypto = require('crypto');
//const seed = crypto.randomBytes(32);
//const seedhex = seed.toString("hex")

describe('test', () => {
    const seedhex = '8edad31a95e7d59f8837667510d75a4d'
    const words = 'hardly point goal hallway patience key stone difference ready caught listen fact'

    it('encode test', () => {
        const result: string[] = mn_encode(seedhex)
        assert(result.join(' ') === words)
    })
    it('decode test', () => {
        const result: string = mn_decode(words.split(' '))
        assert(result === seedhex)
    })
    it('valid test', () => {
        const result: boolean = valid_word('stone')
        assert(result)
    })
})
