#!/usr/bin/env node

const {
  relayInit,
  validateEvent,
  verifySignature,
  signEvent,
  getEventHash,
  getPublicKey
} = require('nostr-tools');
require('websocket-polyfill');

const arguments = process.argv;
const listenFor = arguments.slice(2);

const connect = (relayUrls) => {
	const relays = relayUrls.map(url => new Promise(async (resolve, reject) => {
		try {
			const relay = relayInit(url)
			await relay.connect()

			relay.on('connect', async () => {
			  	resolve(relay);
			})
			relay.on('error', () => {
				reject(`failed to connect to ${relay.url}`); 
			})
		} catch (err) {
			reject(`failed to connect to ${url}`);
		}
	}))

	return Promise.allSettled(relays)
		.then(relays => {
			return relays.filter(r => r.status === 'fulfilled').map(r => r.value)
		})
		.catch((err) => {
			throw new Error('relays failed to connect')
		});
}

const listen = (relays, pks) => {
	relays.forEach(r => {
		const sub = r.sub([
		  {
		    kinds: [1],
		    authors: pks
		  }
		]);

		sub.on('event', event => {
		  console.log('got event:', event)
		})
	})
	console.log('Listening for keys: ' + pks) 
}



connect(["wss://nostr.wordform.space"])
	.then(async (relays) => {
		await listen(relays, listenFor)
	})
	.catch(err => console.log(err))
