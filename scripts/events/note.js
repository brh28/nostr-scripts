require('dotenv').config();
const { getPublicKey } = require('nostr-tools');

module.exports = (content) => {
    const pubKey = getPublicKey(process.env.nostrPrivKey);
	return {
  		kind: 1,
  		created_at: Math.floor(Date.now() / 1000),
  		pubkey: pubKey,
  		tags: [
    		["p", pubKey],
  		],
  		content: content,
	}
}