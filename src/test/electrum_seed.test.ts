import * as assert from 'assert'
import * as crypto from 'crypto'
import { encode, decode, mn_encode_unsafe, mn_decode_unsafe, valid_word } from '../lib/electrum_seed'
import mnemonic_words from '../lib/wordlist'

describe('normal test', () => {
    const seedhex = '8edad31a95e7d59f8837667510d75a4d'
    const words = 'hardly point goal hallway patience key stone difference ready caught listen fact'

    it('internal encode test', () => {
        const result: string[] = mn_encode_unsafe(seedhex)
        assert(result.join(' ') === words)
    })
    it('internal decode test', () => {
        const result: string = mn_decode_unsafe(words.split(' '))
        assert(result === seedhex)
    })
    it('valid test success', () => {
        const result: boolean = valid_word('stone')
        assert(result === true)
    })
    it('valid test failure', () => {
        const result: boolean = valid_word('ston')
        assert(result === false)
    })
    it('random test', () => {
        const seed: Buffer = crypto.randomBytes(32);
        const seedhex: string = seed.toString("hex")
        const new_words: string[] = mn_encode_unsafe(seedhex)
        const restore_seedhex: string = mn_decode_unsafe(new_words)
        assert(seedhex === restore_seedhex)
    })
    it('length check', () => {
        assert(mnemonic_words.length === 1626)
    })
    it('safe encode test', () => {
        const result: string = encode(seedhex)
        assert(result === words)
    })
    it('safe decode test', () => {
        const result: string = decode(words)
        assert(result === seedhex)
    })
})
describe('abnormal test', () => {
    it('encode test 1', (done) => {
        try{
            const result: string = encode('')
            done(new Error("false"))
        }catch(e){ done(e.message === 'invalid empty string' ? null : new Error()) }
    })
    it('encode test 2', (done) => {
        try{
            const result: string = encode('00')
            done(new Error("false"))
        }catch(e){ done(e.message === 'must be a multiple of 8' ? null : new Error()) }
    })
    it('encode test 3', (done) => {
        try{
            const result: string = encode('ss')
            done(new Error("false"))
        }catch(e){ done(e.message === 'must be a hex string' ? null : new Error()) }
    })
    it('encode test 4', (done) => {
        try{
            const result: string = encode('ssssssss')
            done(new Error("false"))
        }catch(e){ done(e.message === 'must be a hex string' ? null : new Error()) }
    })
    it('decode test 1', (done) => {
        try{
            const result: string = decode('')
            done(new Error("false"))
        }catch(e){ done(e.message === 'invalid empty string' ? null : new Error()) }
    })
    it('decode test 2', (done) => {
        try{
            const result: string = decode('stone')
            done(new Error("false"))
        }catch(e){ done(e.message === 'must be a multiple of 3' ? null : new Error()) }
    })
    it('decode test 3', (done) => {
        try{
            const result: string = decode('ston')
            done(new Error("false"))
        }catch(e){ done(e.message === 'include invalid word' ? null : new Error()) }
    })
    it('decode test 4', (done) => {
        try{
            const result: string = decode('z z z')
            done(new Error("false"))
        }catch(e){ done(e.message === 'include invalid word' ? null : new Error()) }
    })
    it('decode test 5', (done) => {
        try{
            const result: string = decode('stone stone stone stone')
            done(new Error("false"))
        }catch(e){ done(e.message === 'must be a multiple of 3' ? null : new Error()) }
    })
})

