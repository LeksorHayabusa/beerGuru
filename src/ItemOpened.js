import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import * as BeerAPI from './BeerAPI'
import SimilarList from './SimilarList'

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
			tagline,
			ibu,
			abv,
			ebc,
			description,
			food_pairing } = openedItem;
		return (
			<div className="opened-top">
				<div 
					className="opened-cover"
					style={{
						width: '200px',
						height: '400px',
						backgroundImage: `url("${image_url}")`
					}} 
					>
				</div>
				<div className='opened-overview'>
					<div className='opened-title'>{ name }</div>
					<div className='opened-slogan'>{ tagline }</div>
					<div className='opened-feature-container'>
						<div><p className='opened-features-name'>IBU</p>{ ibu }</div>
						<div><p className='opened-features-name'>ABV</p>{ abv }%</div>
						<div><p className='opened-features-name'>EBC</p>{ ebc }</div>
					</div>
					<div className='opened-description'>{ description }</div>
					<div className='opened-pairing-list'>
						<p>Best served with:</p>
						<ul>
							{food_pairing ? food_pairing.map(el => 
								<li key="el">{ el }</li>
							) : 'no specified food'}
						</ul>
					</div>
					<SimilarList 
						mainState={ this.props.mainState }
					/>
				</div>
			</div>
		)
	}
}

export default ItemOpened