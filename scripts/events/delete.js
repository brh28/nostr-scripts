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


// {
//   "kind": 0,
//   "created_at": Math.floor(Date.now() / 1000),
//   tags: [],
//   content: JSON.stringify({
//   	name: "WordForm.Space",
//   	nip05: "_@wordform.space",
//   	about: "A marketplace for online content.",
//   	picture: "https://wordform.space/favicon.ico"
//   }),
//   pubkey: pk
// }