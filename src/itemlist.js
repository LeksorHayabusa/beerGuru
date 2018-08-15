import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import ItemThumbnail from './ItemThumbnail'

class ItemList extends Component {

	handleScroll(e) {
		const scrolled = window.innerHeight + window.scrollY,
		preBottom = document.body.offsetHeight - 500,
		items = this.props.mainState.items;
		if(scrolled >= preBottom && items.length) this.props.uploadNextItems()
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
			isLoading, 
			isError, 
			isListEnd } = this.props.mainState;

		//handling errors while fetching content
		const itemsOrError = !isError ? itemList : errorMessage;
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