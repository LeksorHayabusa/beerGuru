const api = `https://api.punkapi.com/v2/beers`;

const handleStatus = (res) => {
	let error;
	if(res.status >= 500) {
		error = new Error()
		error.message = 'Server error'
		error.status = res.status
	}
	if(res.status >= 400) {
		error = new Error()
		error.message = 'Wrong query'
		error.status = res.status
	}
	return error
}

export const getAll = (page, per_page) => {
	const query = `${api}?page=${page}&per_page=${per_page}`;
	console.log(page, per_page, query)
	return fetch(query)
		.then(res => {
			if(handleStatus(res)) throw handleStatus(res);
			return res.json()
		})
		.then(data => data)
		.catch( er => er)
}

export const getSingleBeer = (id) => {
	const query = `${api}/${id}`;
	return fetch(query)
		.then(res => {
			if(handleStatus(res)) throw handleStatus(res);
			return res.json()
		})
		.then(data => {console.log(data[0]); return data[0]})
		.catch( er => er)
}