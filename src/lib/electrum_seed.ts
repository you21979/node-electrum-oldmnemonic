import mnemonic_words from './wordlist'

const range = (max: number): number[] => Array.from({length: max}, (v, k) => k)
const pad8 = (num: number): string => ('00000000' + (num).toString(16)).slice(-8)
const mod = ( x: number, y: number): number => x - y * Math.floor(x / y)

const wn: number = mnemonic_words.length

export const mn_encode_unsafe = (message: string): string[] => {
    return range(message.length / 8).map( (i: number): string[]  => {
        const idx: number = 8 * i
        const word: string = message.slice(idx, idx + 8)
        const x: number = parseInt(word, 16)
        const w1: number = Math.floor(mod(x, wn))
        const w2: number = Math.floor(mod(( x / wn ) + w1, wn))
        const w3: number = Math.floor(mod((( x / wn / wn ) + w2), wn))
        return [mnemonic_words[w1], mnemonic_words[w2], mnemonic_words[w3]]
    }).reduce((r: string[], v: string[]): string[] => {
        return r.concat(v)
    }, [])
}

export const mn_decode_unsafe = (wlist: string[]): string => {
    return range(wlist.length / 3 | 0).map( (i: number): number => {
        const idx: number = 3 * i
        const [word1, word2, word3]: string[] = wlist.slice(idx, idx + 3)
        const w1: number = mnemonic_words.indexOf(word1)
        const w2: number = mod(mnemonic_words.indexOf(word2), wn)
        const w3: number = mod(mnemonic_words.indexOf(word3), wn)
        const x: number = w1 +wn*mod((w2-w1), wn) +wn*wn*mod((w3-w2), wn)
        return x
    }).reduce((r: string, v: number): string => {
        return r + pad8(v)
    }, '')
}

export const encode = (seedhex: string): string => {
    if( seedhex.length === 0 ) throw new Error("invalid empty string")
    if( seedhex.length % 8 ) throw new Error("must be a multiple of 8")
    if( isNaN(parseInt(seedhex, 16)) ) throw new Error("must be a hex string")
    const wlist: string[] = mn_encode_unsafe(seedhex)
    if(wlist.length === 0) throw new Error("zero word list")
    const wordstring: string = wlist.join(' ')
    return wordstring
}

export const decode = (wordstring: string): string => {
    const wlist: string[] = wordstring.split(' ')
    if(wlist.length === 0) throw new Error("zero word list")
    if(wlist.length % 3) throw new Error("must be a multiple of 3")
    wlist.forEach( word => {
        if(!valid_word(word)) throw new Error("include invalid word")
    })
    const seedhex: string = mn_decode_unsafe(wlist)
    return seedhex
}

export const valid_word = (word: string): boolean => {
    return mnemonic_words.indexOf(word) === -1 ? false : true
}


