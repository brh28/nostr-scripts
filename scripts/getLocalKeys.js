#!/usr/bin/env node

const { getPublicKey } = require('nostr-tools');
require('dotenv').config();

const sk = process.env.nostrPrivKey;
const pk = getPublicKey(sk);

console.log(`secret = ${sk}`);
console.log(`public = ${pk}`);
