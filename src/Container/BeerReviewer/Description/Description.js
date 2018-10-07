import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Description.css';
import LoadingSpinner from '../../../Components/UI/LoadingSpinner/LoadingSpinner';
import axios_beerApi from '../../../APIs/beerApi';
import { statusHandler, itemErrorChecker } from '../../../ErrorHandler';
import * as actionsCreator from '../../../store/actions/index';


class Description extends Component {

	state = {
		isError: false,
		itemID: undefined,
		item: {},
		isLoading: true
	}

	singleItemHandler = () => {
		this.setState({ isError: false })
		const itemID = this.state.itemID;
		const query = `/${itemID}`;
		axios_beerApi.get(query)
			.then(res => {
				if (statusHandler(res)) throw statusHandler(res);
				return res.data.shift()
			})
			.catch(er => er)
			.then(item => {
				if (itemErrorChecker(item)) return;
				this.setState({
					isLoading: false,
					item: item
				})
			})
	}

	//if item is undefined then read its id from location
	item = (item = window.location.pathname.match(/\d+/)[0]) => {
		if (!this.state.isLoading) {
			this.setState({ isLoading: true })
		}
		if (typeof (item) === 'string') {
			this.props.onModalOpen();
			//otherwise the item is specified and must be fetched
			this.setState(
				{ itemID: item },
				() => this.singleItemHandler()
			)
		}
		//if item received from SuggestionList than push that item without fetching into state array
		/* if (typeof (item) === 'object') {
			return this.setState({
				item,
				itemID: item.id
			})
		} */
	}

	componentDidMount = () => {
		this.item()
	}

	render() {
		const {
			image_url,
			name,
			tagline,
			ibu,
			abv,
			ebc,
			description,
			food_pairing } = this.state.item,
			//test what is a kind of image cover for bottle or keg
			image = !(/keg\.png/i.test(image_url)),
			loadingSpinner = this.state.isLoading ? (<LoadingSpinner />) : undefined,
			imageContainer =
				<div
					className={image ? classes['bottle-cover'] : classes['keg-cover']}
					style={{
						width: '200px',
						height: image ? '450px' : '300px',
						backgroundImage: `url("${image_url}")`
					}}
				>
					{loadingSpinner}
				</div>;
		return (
			<div className={classes.Description}>
				{imageContainer}
				<div className={classes['text-container']}>
					<h3 className={classes.title}>{name}</h3>
					<div className={classes.slogan}>{tagline}</div>
					<div className={classes['feature-container']}>
						<div className={classes['features-name']}><strong>IBU</strong>: {ibu}</div>
						<div className={classes['features-name']}><strong>ABV</strong>: {abv}%</div>
						<div className={classes['features-name']}><strong>EBC</strong>: {ebc}</div>
					</div>
					<div className={classes.description}>{description}</div>
					<div className={classes['pairing-list']}>
						<p>Best served with:</p>
						<ul className={classes["pairing-list"]}>
							{food_pairing ? food_pairing.map(el =>
								<li key={el}>{el}</li>
							) : 'no specified food'}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		itmDscrp: state.itmDscrp.item,
		modalDscrp:state.modalDscrp.isOpened
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onItemGetting: () => dispatch(actionsCreator.getItem()),
		onModalOpen: () => dispatch(actionsCreator.openModal())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Description)