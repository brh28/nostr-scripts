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
const users = arguments.slice(2);

const connect = (relayUrls) => {
	const relays = relayUrls.map(url => new Promise(async (resolve, reject) => {
		try {
			const relay = relayInit(url)
			await relay.connect()

			relay.on('connect', async () => {
				console.log(`connected to ${relay.url}`)
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

const listen = (relays, pks, users) => {
	relays.forEach(r => {
		const filters = {
			kinds: [0, 1],
                    	authors: pks
		}
		if (users && users.length > 0) filters['#u'] = users
		console.log(filters)
		const sub = r.sub([filters]);

		sub.on('event', event => {
		  console.log('got event:', event)
		})
	})
	console.log('Listening for keys: ' + pks) 
}



connect(["wss://nostr1.tunnelsats.com", 
	"wss://nostr-01.bolt.observer", 
	"wss://nostr-pub.wellorder.net", 
	"wss://nostr-relay.wlvs.space",
	"wss://nostr.bitcoiner.social",
	"wss://relay.damus.io",
	"wss://relay.nostr.info",
	"wss://relayer.fiatjaf.com",
	"wss://nostr.v0l.io"
	])
	.then(async (relays) => {
		await listen(relays, ['55edcc101aa6fd616f1bbcfe404198eed6dfb0d4370191c2654530d7779dabce'], users)
	})
	.catch(err => console.log(err))
