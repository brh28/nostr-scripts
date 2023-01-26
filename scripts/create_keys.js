#!/usr/bin/env node

const {generatePrivateKey, getPublicKey} = require('nostr-tools');

const generateKeyPair = () => {
	const sk = generatePrivateKey()
	return { privKey: sk, pubkey: getPublicKey(sk) }
}

const keys = generateKeyPair();
console.log('privKey = ', keys.privKey);
console.log('pubkey = ', keys.pubkey);
