import * as assert from 'assert'
import * as crypto from 'crypto'
import { mn_encode, mn_decode, valid_word } from '../lib/electrum_seed'
import mnemonic_words from '../lib/wordlist'

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
    it('valid test success', () => {
        const result: boolean = valid_word('stone')
        assert(result === true)
    })
    it('valid test false', () => {
        const result: boolean = valid_word('ston')
        assert(result === false)
    })
    it('random test', () => {
        const seed: Buffer = crypto.randomBytes(32);
        const seedhex: string = seed.toString("hex")
        const new_words: string[] = mn_encode(seedhex)
        const restore_seedhex: string = mn_decode(new_words)
        assert(seedhex === restore_seedhex)
    })
    it('length check', () => {
        assert(mnemonic_words.length === 1626)
    })
})
