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
		if (res.ok) return res.json();
	})
	.catch(err => err)
}
export function remove(uniqueId){
	return fetch(`${BASE_URL}/remove`, {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + tokenService.getToken(),
			"Content-Type": "application/json"
		},
		body: JSON.stringify({postToRemove: uniqueId})
	}).then(res => {
		if (res.ok) return res.json();
	})
	.catch(err => err)
}
export function getAll() {
	return fetch(BASE_URL, {
	  headers: {
			'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => {
		if (res.ok) return res.json();
	})
	.catch(err => err)
}
