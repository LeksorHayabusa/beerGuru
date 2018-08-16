import React, { Component} from 'react'
import ItemThumbnail from './ItemThumbnail'

class SimilarList extends Component {

	constructor() {
		super()
		this.separatedItems = []
	}

	getRandomItem = () => {
		const { items } = this.props.mainState,
			random = Math.floor(Math.random() * items.length);
		console.log(items[random])
		return items[random]
	}

	showItems = () => {
		const { items } = this.props.mainState;
		if(items.length != 0) {
			this.separatedItems.push(this.getRandomItem())
			console.log(this.separatedItems)
		}
	}
	
	componentDidMount = () => {
		console.log(this.separatedItems,'a')
	}
	

	render() {
		this.showItems()
		const { items } = this.props.mainState
		console.log(this.separatedItems.length, 'b')
		return (
			<div>
				<hr></hr>
				<p>You might also like:</p>
				<ul className="item-list" id="itemList">
					{this.separatedItems.length > 0 ? this.separatedItems.map(item => (
						<li 
							className='item'
							key={ item.id }
							onClick={ () => {
								console.log('clicked item', item.id)
								this.props.openItem(item.id)} }
						>
							<ItemThumbnail item={ item }/>
						</li>
					)) : null}
				</ul>
				<hr></hr>
			</div>
		)
	}
}

export default SimilarList