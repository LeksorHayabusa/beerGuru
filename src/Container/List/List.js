import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../../Components/Thumbnail/Thumbnail';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import classes from './List.css';
import axios_beerApi from '../../APIs/beerApi';
import {itemErrorChecker, statusHandler} from '../../ErrorHandler';

class List extends Component {
	state = {
		items: [],
		page: null,
		per_page: 10,
		isLoadingContent: false,
		isError: false,
		isEndOfList: false
	}

	nextItemsDownloader = () => {
		const per_page = this.state.per_page;
		let storedItems = [...this.state.items],
			page = this.state.page + 1;
		this.setState({
			isLoadingContent: true,
			isError: false
		})
		const api = `https://api.punkapi.com/v2/beers`;
		const query = `${api}?page=${page}&per_page=${per_page}`;
		axios_beerApi.get(query)
			.then(res => {
				console.log(res);
				if(statusHandler(res)) throw statusHandler(res);
				return res.data
			})
			.then(data => {
				console.log(data);
				return data
			})
			.then(items => {
				if (itemErrorChecker(items)) return;
				if (items.length !== 0) storedItems = storedItems.concat(items);
				//if the queries reached the end of list
				if (items.length === 0) {
					page--;
					this.setState({ isEndOfList: true })
				}
				this.setState({
					items: storedItems,
					page,
					isLoadingContent: false
				})
			})
	}

	handleScroll = (e) => {
		const { isEndOfList } = this.state;
		if (isEndOfList)
			return window.removeEventListener('scroll', this.handleScroll);
		const scrolled = window.innerHeight + window.scrollY,
			preBottom = document.body.offsetHeight - 500,
			items = this.state.items,
			isAlreadyLoading = this.state.isLoadingContent;
		if (scrolled >= preBottom && items.length && !isAlreadyLoading) this.nextItemsDownloader()
	}

	componentDidMount = () => {
		const { isEndOfList } = this.state;
		this.nextItemsDownloader();
		(!isEndOfList && window.addEventListener('scroll', this.handleScroll))
	}

	render() {
		const {
			items,
			isLoadingContent,
			isError,
			isEndOfList } = this.state;

		const errorMessage = <p>An error occured getting data</p>;
		const itemList =
			<ul className={classes['item-list']}>
				{items.map(item => (
					<li
						className={classes.item}
						key={item.id}
					>
						<Link to={`/details/:${item.id}`}>
							<Thumbnail item={item} />
						</Link>
					</li>
				))}
			</ul>
		const listEnd = isEndOfList ? <p>That's all beers</p> : null,
			content = !isError ? itemList : errorMessage,
			loading = isLoadingContent ? <LoadingSpinner /> : null;
		//handling errors while fetching contents
		return (
			<div className={classes.List}>
				{content}
				{loading}
				{listEnd}
			</div>
		)
	}
}

export default List