import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BeerAPI from './../../BeerAPI'
import Thumbnail from './../../Thumbnail/Thumbnail'
import Loading from './../../Loading/Loading'
import classes from './SimilarList.css'
import Aux from '../../../hoc/Aux'
import WithClass from '../../../hoc/WithClass'

class SimilarList extends Component {
	state = {
		isItemFetching: false,
		isItemsLoading: false,
		isError: false,
		quantity: 3,
		fetchedItems: [],
		items: []
	}

	checkItemError = (element) => {
		if (element instanceof Error || element === undefined) {
			console.log(element)
			if (element instanceof Error && element.statusCode === 429)
				alert('you have reached query limits. Try later in an hour');
			this.setState({
				isError: true,
				isItemFetching: false
			})
			return true
		}
	}
	//download random items
	randomItem = (index) => {
		//we provide index to know a place to put a new item
		this.setState({
			isItemFetching: true,
			isError: false
		},
			() =>
				BeerAPI.getSingleBeer('random')
					.then(item => {
						if (this.checkItemError(item)) return;
						const downloadItems = [...this.state.fetchedItems]
						console.log('hello from random func', downloadItems);
						// here is we test what to do with new item,
						// to splice it or push into the array
						(index) ? downloadItems.splice(index, 0, item) : downloadItems.push(item)
						this.setState({
							isItemFetching: false,
							fetchedItems: downloadItems
						})
					}))
	}
	// download and store items
	downloadedItems = (id) => {
		// in this test we find specified id in the fetched items and remove it
		// allowing to download new one
		let alreadyFetched = [],
			index;
		if (id) {
			console.log('hello from download items');
			alreadyFetched = [...this.state.fetchedItems];
			index = alreadyFetched.findIndex((e) => e.id === id);
			const removed = alreadyFetched.splice(index, 1)
			console.log('hello from index', alreadyFetched, index, removed);
		}
		// here is we download new item
		this.setState({
			isItemsLoading: true,
			fetchedItems: alreadyFetched
			// items: []
		},
			() => {
				let i = this.state.quantity - alreadyFetched.length;
				console.log('hello from i', i);
				while (i--) {
					this.randomItem(index)
				}
			})
	}

	renderedDownloadedItems = () => {
		//testing whether the loading is finished and items need to be rendered
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
			console.log('hello from render setState', fetched, this.state.items);
		}
	}

	componentDidMount = () => {
		// this.prerenderedItems()
		this.downloadedItems()
	}

	render() {
		const {
			isItemsLoading,
			items } = this.state,
			loading = isItemsLoading ? <Loading /> : null;
		this.renderedDownloadedItems()
		return (
			<Aux>
				<h4 className={classes.title}>You might like:</h4>
				{loading}
				{!isItemsLoading ? <div className={classes.list}>
					{items.map(item => (
						<div
							className={classes.item}
							key={item.id}
						>
							<Link
								to={`/details/:${item.id}`}
								onClick={() => {
									console.log('hello from id', item.id)
									this.downloadedItems(item.id)
									this.props.newItem(item)
								}}
							>
								<Thumbnail item={item} />
							</Link>
						</div>
					))}
				</div> : null}
			</Aux>
		)
	}
}

export default WithClass(SimilarList, classes.SimilarList)