import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import SimilarList from './../SimilarList/SimilarList'
import classes from './Page.css'

class Page extends Component {

	getAddressItemID = () => {
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
			<div className={classes.top}>
				<div className={classes.overview}>
					<div 
						className={this.checkProperImage() ? classes.cover : classes.keg_cover}
						style={{
							width: '200px',
							height: this.checkProperImage() ? '450px' : '300px',
							backgroundImage: `url("${image_url}")`
						}} 
						>
					</div>
					<div className={classes['text-container']}>
						<h3 className={classes.title}>{ name }</h3>
						<div className={classes.slogan}>{ tagline }</div>
						<div className={classes['feature-container']}>
							<div className={classes['features-name']}><strong>IBU</strong>: {ibu}</div>
							<div className={classes['features-name']}><strong>ABV</strong>: {abv}%</div>
							<div className={classes['features-name']}><strong>EBC</strong>: {ebc}</div>
						</div>
						<div className={classes.description}>{ description }</div>
						<div className={classes['pairing-list']}>
							<p>Best served with:</p>
							<div className={classes["pairing-list"]}>
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
					showSimilarItems={ this.props.showSimilarItems }
					changeSimilarItems={ this.props.changeSimilarItems }
				/>
				<Link to='/' className={classes["back-to-list-button"]}><p>Return ot the List</p></Link>
			</div>
		)
	}
}

export default Page