require('dotenv').config();
const { getPublicKey } = require('nostr-tools');

module.exports = (eventId, msg) => {
	return {
  		kind: 5,
  		created_at: Math.floor(Date.now() / 1000),
  		pubkey: getPublicKey(process.env.nostrPrivKey),
  		tags: [
    		["e", eventId],
  		],
  		content: msg
	}
}
