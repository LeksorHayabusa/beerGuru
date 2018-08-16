const api = `https://api.punkapi.com/v/beers`;

export const getAll = (page, per_page) => {
	const query = `${api}?page=${page}&per_page=${per_page}`;
	console.log(page, per_page, query)
	return fetch(query)
		.then(res => {
			if(res.status >= 400) throw new Error('Wrong query')
			if(res.status >= 500) throw new Error('Wrong response')
			return res.json()
		})
		.then(data => {console.log(data); return data})
		.catch( er => er)
}

export const getSingleBeer = (id) => {
	const query = `${api}/${id}`;
	return fetch(query)
		.then(res => {
			if(res.status >= 400) throw new Error('Wrong query')
			if(res.status >= 500) throw new Error('Wrong response')
			return res.json()
		})
		.then(data => {console.log(data); return data})
		.catch( er => er)
}