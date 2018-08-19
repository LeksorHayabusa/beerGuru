import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import ItemThumbnail from './ItemThumbnail'
import loadingImg from './img/circle-arrow.svg';

class ItemList extends Component {

	handleScroll = (e) => {
		const scrolled = window.innerHeight + window.scrollY,
		preBottom = document.body.offsetHeight - 500,
		items = this.props.mainState.items,
		isAlreadyLoading = this.props.mainState.isListLoading;
		if(scrolled >= preBottom && items.length && !isAlreadyLoading) this.props.downloadNextItems()
	}

	componentDidMount = () => {
		window.addEventListener('scroll', this.handleScroll)
	}
	
	componentWillUnmount = () => {
		window.removeEventListener('scroll', this.handleScroll)
	}	

	render() {
		const { 
			items, 
			isListLoading, 
			isListError, 
			isListEnd } = this.props.mainState;

		const errorMessage = <p>An error occured getting data</p>;
		const itemList =
					<div>
						<div className="item-list" id="itemList">
							{items.map(item => (
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
							))}
						</div>
					</div>;
		//handling errors while fetching contents
		return (
			<div className="container">
				{ !isListError ? itemList : errorMessage }
				{ isListLoading ? <div 
					className="loading"
					style={{
						width: '50px',
						height: '50px',
						backgroundImage: `url("${loadingImg}")`
					}} 
				></div> : null }
				{ isListEnd ? <p>List End</p> : null }
			</div>
		)
	}
}

export default ItemList