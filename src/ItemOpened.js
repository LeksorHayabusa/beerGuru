import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import * as BeerAPI from './BeerAPI'

class ItemOpened extends Component {
	render() {
		const { 
			items, 
			isListLoading, 
			isListError, 
			isListEnd
			isOpenedLoading,
			isOpenedError,
			openedItemID,
			openedItem } = this.props.mainState;
		return (
			<div>
				<h3>{openedItem.name}</h3>
				
			</div>
		)
	}
}

export default ItemOpened