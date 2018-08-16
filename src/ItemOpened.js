import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import * as BeerAPI from './BeerAPI'

class ItemOpened extends Component {
	render() {
		const { 
			items, 
			isListLoading, 
			isListError, 
			isListEnd,
			isOpenedLoading,
			isOpenedError,
			openedItemID,
			openedItem } = this.props.mainState,
		{	image_url,
			name,
			tagline } = openedItem
		console.log(openedItem)
		return (
			<div className="full-description-top">
				<div 
					className="full-description-cover"
					style={{
						width: '128px',
						height: '190px',
						backgroundImage: `url("${image_url}")`
					}} 
					>
				</div>
				<div className='full-description-title'>{ name }</div>
				<div className='full-description-slogan'>{ tagline }</div>
			</div>
		)
	}
}

export default ItemOpened