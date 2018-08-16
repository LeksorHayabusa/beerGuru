import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import ItemThumbnail from './ItemThumbnail'

class ItemList extends Component {

	handleScroll(e) {
		const scrolled = window.innerHeight + window.scrollY,
		preBottom = document.body.offsetHeight - 500,
		items = this.props.mainState.items;
		if(scrolled >= preBottom && items.length) this.props.downloadNextItems()
	}

	componentDidMount = () => {
		window.addEventListener('scroll', (e) => this.handleScroll(e))
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

		const loading = isListLoading ? <p className="loading">Loading</p> : null;
		const errorMessage = <p>An error occured getting data</p>;
		const listEnd = isListEnd ? <p>List End</p> : null;
		const itemList =
					<div>
						<ul className="item-list" id="itemList">
							{items.map(item => (
								<li 
									className='item'
									key={ item.id }
									onClick={ () => {
										console.log('clicked item')
										this.props.openItem(item.id)} }
								>
									<ItemThumbnail item={ item }/>
								</li>
							))}
						</ul>
					</div>;
		//handling errors while fetching content
		const itemsOrError = !isListError ? itemList : errorMessage;
		return (
			<div className="container">
				{ itemsOrError }
				{ loading }
				{ listEnd }
			</div>
		)
	}
}

export default ItemList