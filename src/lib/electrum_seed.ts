import mnemonic_words from './wordlist'

const range = (max) => Array.from({length: max}, (v, k) => k)
const pad = (num: number) => ('00000000' + (num).toString(16)).slice(-8)
const mod = (i, j): number => {
    return (i % j) < 0 ? (i % j) + 0 + (j < 0 ? -j : j) : (i % j + 0)
}

const n: number = mnemonic_words.length

export const mn_encode = (message: string): string[] => {
    let out: string[] = []
    range(message.length / 8).forEach( i => {
        const idx: number = 8 * i
        const word: string = message.slice(idx, idx + 8)
        const x: number = parseInt(word, 16)
        const w1: number = ( x % n) | 0
        const w2: number = (( x / n ) + w1) % n | 0
        const w3: number = (( x / n / n ) + w2) % n | 0
        out = out.concat( mnemonic_words[w1], mnemonic_words[w2], mnemonic_words[w3])
    })
    return out
}

export const mn_decode = (wlist: string[]): string => {
    let out: string = ''
    range(wlist.length / 3 | 0).forEach( i => {
        const idx: number = 3 * i
        const [word1, word2, word3]: string[] = wlist.slice(idx, idx + 3)
        const w1: number = mnemonic_words.indexOf(word1)
        const w2: number = (mnemonic_words.indexOf(word2))%n
        const w3: number = (mnemonic_words.indexOf(word3))%n
        const x: number = w1 +n*mod((w2-w1),n) +n*n*mod((w3-w2),n)
        out += pad(x)
    })
    return out
}

export const valid_word = (word: string): boolean => {
    return mnemonic_words.indexOf(word) === -1 ? false : true
}

