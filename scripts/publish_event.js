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
require('dotenv').config();

// const fs = require('fs');

const sk = process.env.nostrPrivKey
const pk = getPublicKey(sk);
console.log(`pk = ${pk}`)

const arguments = process.argv;
console.log(arguments[2])

let event = null;
switch (arguments[2]) {
  case ('delete'):
    const template = require('./events/delete');
    event = template(arguments[3], 'this was an accident');
    break;
  default:
    break;
}

event.id = getEventHash(event)
event.sig = signEvent(event, sk)

const ok = validateEvent(event)
const veryOk = verifySignature(event)

const relayConnect = async (url, evt) => {
	const relay = relayInit(url)
	await relay.connect()

	relay.on('connect', async () => {
	  console.log(`connected to ${relay.url}`)

	  await publishEvent(relay, event);

	})
	relay.on('error', () => {
	  console.log(`failed to connect to ${relay.url}`)
	})
	// .then(async () => {
	// 	console.log(`connected to ${relay.url}`)
	//   	await publishEvent(relay, event)
	// 	await relay.close()

	// }).catch(err => {
	// 	console.log(`failed to connect to ${relay.url}`)
	// })

	// relay.on('connect', async () => {
	 //  	console.log(`connected to ${relay.url}`)

	 //  	const pub = relay.publish(evt)
		// pub.on('ok', () => {
		//   	console.log(`${relay.url} has accepted our event`)
		// })
		// pub.on('seen', () => {
		//   	console.log(`we saw the event on ${relay.url}`)
		// })
		// pub.on('failed', reason => {
		//   	console.log(`failed to publish to ${relay.url}: ${reason}`)
		// })

		// await relay.close()
	//})

	// relay.on('error', (err) => {
	//   console.log(`failed to connect to ${relay.url}`)
	//   console.log(err)
	// })

	// return relay
}

const publishEvent = async (relay, evt) => {
  console.log(`Publishing event: ${JSON.stringify(evt)}`);
	const pub = relay.publish(evt)
	pub.on('ok', () => {
	  	console.log(`${relay.url} has accepted our event`)
	})
	pub.on('seen', () => {
	  	console.log(`we saw the event on ${relay.url}`)
	})
	pub.on('failed', reason => {
	  	console.log(`failed to publish to ${relay.url}: ${reason}`)
	})
}

[
	"wss://nostr.mado.io", 
	"wss://relay.damus.io", 
	"wss://relay.nostr.ch", 
	"wss://relay.nostr.info"
]
.forEach(async url => {
	await relayConnect(url, event)
	//.then(r => publishEvent(r, event))
})
// .forEach(async r => await publishEvent(r, event))
