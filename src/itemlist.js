import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import ItemThumbnail from './ItemThumbnail'

class ItemList extends Component {
	
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