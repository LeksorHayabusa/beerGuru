import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Thumbnail from '../../Components/Thumbnail/Thumbnail';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import classes from './SimilarList.css';
import Aux from '../../hoc/Aux';
import WithClass from '../../hoc/WithClass';
import axios_beerApi from '../../APIs/beerApi';
import { statusHandler, itemErrorChecker } from '../../ErrorHandler';

class SimilarList extends Component {
	state = {
		isItemFetching: false,
		isItemsLoading: false,
		isError: false,
		quantity: 3,
		fetchedItems: [],
		items: [],
		loadingItem: null
	}
	//download random items
	randomItem = (index) => {
		//we provide index to know a place to put a new item
		this.setState({
			isItemFetching: true,
			isError: false
		},
			() => {
				const query = '/random';
				axios_beerApi.get(query)
					.then(res => {
						if (statusHandler(res)) throw statusHandler(res);
						return res.data.shift()
					})
					.catch(er => er)
					.then(item => {
						if (itemErrorChecker(item)) return;
						const downloadItems = [...this.state.fetchedItems];
						// here is we test what to do with new item,
						// to splice it or push into the array
						(index) ? downloadItems.splice(index, 0, item) : downloadItems.push(item)
						this.setState({
							isItemFetching: false,
							fetchedItems: downloadItems
						})
					})
			}
		)
	}
	// download and store items
	downloadedItems = (id) => {
		// in this test we find specified id in the fetched items and remove it
		// allowing to download new one
		let alreadyFetched = [],
			index;
		if (id) {
			alreadyFetched = [...this.state.fetchedItems];
			index = alreadyFetched.findIndex((e) => e.id === id);
			alreadyFetched.splice(index, 1);
		}
		// here is we download new items
		this.setState({
			isItemsLoading: true,
			fetchedItems: alreadyFetched
			// items: []
		},
			() => {
				// deside how many items to be downloaded
				let i = this.state.quantity - alreadyFetched.length;
				while (i--) {
					this.randomItem(index)
				}
			})
	}

	renderedItems = () => {
		//verification whether the loading is finished and items need to be rendered
		const {
			fetchedItems,
			isItemsLoading,
			quantity
		} = this.state;
		if (fetchedItems.length === quantity && isItemsLoading) {
			const fetched = [...fetchedItems];
			this.setState({
				isItemsLoading: false,
				items: fetched
			})
		}
	}

	componentDidMount = () => {
		this.downloadedItems()
	}

	render() {
		const {
			isItemsLoading,
			items } = this.state;
			const loading = isItemsLoading ? <LoadingSpinner /> : null;
		this.renderedItems()
		return (
			<Aux>
				<h4 className={classes.title}>You might like:</h4>
				{loading}
				{!isItemsLoading ? <ul className={classes.list}>
					{items.map(item => (
						<li
							className={classes.item}
							key={item.id}
						>
							<Link
								to={`/details/:${item.id}`}
								onClick={() => {
									this.downloadedItems(item.id)
									this.props.newItem(item)
								}}
							>
								<Thumbnail item={item} />
							</Link>
						</li>
					))}
				</ul> : null}
			</Aux>
		)
	}
}

SimilarList.propTypes = {
	isItemFetching: PropTypes.bool,
	isItemsLoading: PropTypes.bool,
	isError: PropTypes.bool,
	quantity: PropTypes.number,
	fetchedItems: PropTypes.array,
	items: PropTypes.array
}

export default WithClass(SimilarList, classes.SimilarList)