import React, { Component} from 'react'
import ItemThumbnail from './ItemThumbnail'

class SimilarList extends Component {

	constructor() {
		super()
		this.separatedItems = [];
	}

	getRandomItem = () => {
		const { items } = this.props.mainState,
			random = Math.floor(Math.random() * items.length);
		console.log(items[random])
		return items[random]
	}

	showItems = () => {
		console.log('counter', ++this.counter)
		this.searatedItems = [];
		const { items, similarShownItems } = this.props.mainState;
		if(items.length != 0) {
			let i = similarShownItems;
			console.log(similarShownItems)
			while(i--)
				this.separatedItems.push(this.getRandomItem())
		}
	}
	
	componentDidMount = () => {
		this.showItems()
	}
	
	componentWillUnmount = () => {
		console.log('goodbye component')
			
	}

	render() {
		const { items } = this.props.mainState
		return (
			<div>
				<p>You might also like:</p>
				<div className="item-list" id="itemList">
					{this.separatedItems.length > 0 ? this.separatedItems.map(item => (
						<div 
							className='item'
							key={ item.id }
							onClick={ () => {
								console.log('clicked item', item.id)
								this.props.openItem(item.id)} }
						>
							<ItemThumbnail item={ item }/>
						</div>
					)) : null}
				</div>
			</div>
		)
	}
}

export default SimilarList