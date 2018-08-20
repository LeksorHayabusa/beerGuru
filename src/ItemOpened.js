import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import SimilarList from './SimilarList'
import loadingImg from './img/circle-arrow.svg';

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
							height: this.checkProperImage() ? '450px' : '300px',
							backgroundImage: `url("${image_url}")`
						}} 
						>
					</div>
					<div className="opened-text-container">
						<h3 className='opened-title'>{ name }</h3>
						<div className='opened-slogan'>{ tagline }</div>
						<div className='opened-feature-container'>
							<div className='opened-features-name'><strong>IBU</strong>: {ibu}</div>
							<div className='opened-features-name'><strong>ABV</strong>: {abv}%</div>
							<div className='opened-features-name'><strong>EBC</strong>: {ebc}</div>
						</div>
						<div className='opened-description'>{ description }</div>
						<div className='opened-pairing-list'>
							<p>Best served with:</p>
							<div className="pairing-list">
								{food_pairing ? food_pairing.map(el => 
									<div key={ el }>{ el }</div>
								) : 'no specified food'}
							</div>
						</div>
					</div>
				</div>
				<SimilarList 
					openItem={ this.props.openItem }
					mainState={ this.props.mainState }
					changeSimilarItems={ this.props.changeSimilarItems }
					downloadNextItems={ this.props.downloadNextItems }
				/>
				<Link to='/' className="back-to-list-button"><p>Return ot the List</p></Link>
			</div>
		)
	}
}

export default ItemOpened