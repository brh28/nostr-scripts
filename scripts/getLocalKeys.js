#!/usr/bin/env node

const { getPublicKey, nip19 } = require('nostr-tools');
require('dotenv').config();

const sk = process.env.nostrPrivKey;
const pk = getPublicKey(sk);

console.log(`secret = ${sk}`);
console.log(`public = ${pk}`);

console.log(`nPub = ${nip19.npubEncode(pk)}`)
