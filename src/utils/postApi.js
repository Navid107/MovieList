
import tokenService from "./tokenService";

const BASE_URL = "/api/favorites/";

export function favorite(post){
	return fetch(BASE_URL, {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + tokenService.getToken(),
            "Content-Type": "application/json"
		},
        body: JSON.stringify(post)
	}).then(res => {
		// Valid login if we have a status of 2xx (res.ok)
		if (res.ok) return res.json();
		throw new Error('Bad Credentials');
	  })
}

export function getAll() {
	console.log(BASE_URL,"second console.log")
	return fetch(BASE_URL, {
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => {
		console.log(res,'3th console.log')
		// Valid login if we have a status of 2xx (res.ok)
		if (res.ok) return res.json();
		throw new Error('bad Credentials');
	  })
  }


