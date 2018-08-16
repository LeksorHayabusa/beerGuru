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

		const errorMessage = <p>An error occured getting data</p>;
		const itemList =
					<div>
						<ul className="item-list" id="itemList">
							{items.map(item => (
								<li 
									className='item'
									key={ item.id }
									onClick={ () => {
										console.log('clicked item', item.id)
										this.props.openItem(item.id)} }
								>
									<ItemThumbnail item={ item }/>
								</li>
							))}
						</ul>
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