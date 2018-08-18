import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import ItemThumbnail from './ItemThumbnail'

class ItemList extends Component {

	handleScroll = (e) => {
		const scrolled = window.innerHeight + window.scrollY,
		preBottom = document.body.offsetHeight - 500,
		items = this.props.mainState.items,
		isAlreadyLoading = this.props.mainState.isListLoading;
		if(scrolled >= preBottom && items.length && !isAlreadyLoading) this.props.downloadNextItems()
	}

	componentDidMount = () => {
		window.addEventListener('scroll', this.handleScroll)
	}
	
	componentWillUnmount = () => {
		window.removeEventListener('scroll', this.handleScroll)
	}	

	render() {
		const { 
			items, 
			isListLoading, 
			isListError, 
			isListEnd } = this.props.mainState;

		const errorMessage = <p>An error occured getting data</p>;
		const itemList =
					<div>
						<div className="item-list" id="itemList">
							{items.map(item => (
								<div
									className='item'
									key={ item.id }
									onClick={ () => {
										console.log('clicked item', item.id)
										this.props.openItem(item.id)} }
								>
									<div to={`/details/:${item.id}`}>
										<ItemThumbnail item={ item }/>
									</div>
								</div>
							))}
						</div>
					</div>;
		//handling errors while fetching content
		return (
			<div className="container">
				{ !isListError ? itemList : errorMessage }
				{ isListLoading ? <p className="loading">Loading</p> : null }
				{ isListEnd ? <p>List End</p> : null }
			</div>
		)
	}
}

export default ItemList