import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import SimilarList from './SimilarList'

class ItemOpened extends Component {

	getAddressItemID = () => {
		console.log(window.location.pathname.match(/(?:\d+)/))
		return window.location.pathname.match(/\d+/)[0]
	}

	isLoadedItemID = () => {
		const { openedItemID } = this.props.mainState;
		return Boolean( openedItemID )
	}

	checkProperImage = () => {
		const { image_url } = this.props.mainState.openedItem;
		return !(/keg\.png/i .test(image_url))
	}

	componentDidMount = () => {
		const { openItem, downloadNextItems } = this.props;
		if(this.isLoadedItemID) {
			downloadNextItems()
			openItem(this.getAddressItemID())
		}
	}
	

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
				<div className='opened-overview'>
					<div 
						className={this.checkProperImage() ? "opened-cover" : "opened-improper-cover"}
						style={{
							width: '200px',
							height: '400px',
							backgroundImage: `url("${image_url}")`
						}} 
						>
					</div>
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
						<div>
							{food_pairing ? food_pairing.map(el => 
								<div key={ el }>{ el }</div>
							) : 'no specified food'}
						</div>
					</div>
				</div>
				<SimilarList 
					openItem={ this.props.openItem }
					mainState={ this.props.mainState }
					downloadNextItems={ this.props.downloadNextItems }
				/>
				<button className="back-button">
					<Link to='/'>Back</Link>
				</button>
			</div>
		)
	}
}

export default ItemOpened