#!/usr/bin/env node

const {generatePrivateKey, getPublicKey} = require('nostr-tools');

let sk = generatePrivateKey() // `sk` is a hex string
let pk = getPublicKey(sk) // `pk` is a hex string

console.log(sk);
console.log(pk);
