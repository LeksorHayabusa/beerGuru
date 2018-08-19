import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import ItemThumbnail from './ItemThumbnail'
import loadingImg from './img/circle-arrow.svg';

class SimilarList extends Component {

	constructor() {
		super()
		this.separatedItems = [];
	}

	getRandomItem = () => {
		const { items } = this.props.mainState,
			random = Math.floor(Math.random() * items.length);
		return items[random]
	}

	showItems = () => {
		this.separatedItems = [];
		const { 
			items, 
			similarShownItems } = this.props.mainState;
		if(items.length != 0) {
			let i = similarShownItems;
			while(i--)
				this.separatedItems.push(this.getRandomItem())
		} else {
			this.props.downloadNextItems()
		}
	}
	
	componentDidMount = () => {
		this.showItems()
	}
	
	componentWillUnmount = () => {
		console.log('goodbye component')
			
	}

	render() {
		console.log('hello similaxr render ', this.separatedItems, this.props.mainState.similarShownItems)		
		const { 
			items, 
			isListLoading,
			isListError } = this.props.mainState;
		//i run here this.showItems func just as temporary workaround
		!isListLoading ? this.showItems() : null;
		return (
			<div className="similar-container">
				{ isListLoading ? <div 
					className="loading"
					style={{
						width: '50px',
						height: '50px',
						backgroundImage: `url("${loadingImg}")`
					}} 
				></div> : null }
				<h4 className="similar-title">You might also like:</h4>
				<div className="item-list" id="similarList">
					{this.separatedItems.length > 0 ? this.separatedItems.map(item => (
						<div 
							className='item'
							key={ item.id }
							onClick={ () => {
								console.log('clicked item', item.id)
								this.props.openItem(item.id)} }
						>
							<Link to={`/details/:${item.id}`}>
								<ItemThumbnail item={ item }/>
							</Link>
						</div>
					)) : null}
				</div>
			</div>
		)
	}
}

export default SimilarList