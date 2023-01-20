require('dotenv').config();
const { getPublicKey } = require('nostr-tools');

module.exports = () => {
	return {
  		kind: 0,
  		created_at: Math.floor(Date.now() / 1000),
  		pubkey: getPublicKey(process.env.nostrPrivKey),
  		tags: [],
  		content: JSON.stringify({
		  	name: "brh",
		  	//nip05: "_@wordform.space",
		  	about: "My test account.",
		  	picture: "https://wordform.space/logo.png"
		}),
	}
}

// content: JSON.stringify({
// 		  	name: "WordForm.Space",
// 		  	nip05: "_@wordform.space",
// 		  	about: "A marketplace for online content.",
// 		  	picture: "https://wordform.space/logo.png"
// 		}),

// {
//   "kind": 0,
//   "created_at": Math.floor(Date.now() / 1000),
//   tags: [],
  // content: JSON.stringify({
  // 	name: "WordForm.Space",
  // 	nip05: "_@wordform.space",
  // 	about: "A marketplace for online content.",
  // 	picture: "https://wordform.space/favicon.ico"
  // }),
//   pubkey: pk
// }