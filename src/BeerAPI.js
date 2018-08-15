const api = `https://api.punkapi.com/v2/beers`;

export const getAll = (page, per_page) => {
	const query = `${api}?page=${page}&per_page=${per_page}`;
	return fetch(query)
		.then(res => {
			if(res.status >= 400) throw new Error('Wrong query')
			if(res.status >= 500) throw new Error('Wrong response')
			return res.json()
		})
		.then(data => {data})
		.catch( er => er)
}

export const getOnlyOne = (id) => {
	const query = `${api}/${id}`;
	return fetch(query)
		.then(res => {
			if(res.status >= 400) throw new Error('Wrong query')
			if(res.status >= 500) throw new Error('Wrong response')
			return res.json()
		})
		.then(data => {data})
		.catch( er => er)
}