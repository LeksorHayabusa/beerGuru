import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import ItemThumbnail from './ItemThumbnail'
import loadingImg from './img/circle-arrow.svg';

class SimilarList extends Component {

	componentDidMount = () => {
		this.props.showSimilarItems()
	}
	

	componentWillUnmount = () => {
		//clear similar list
		this.props.changeSimilarItems([])
	}

	render() {
		const {
			isListLoading } = this.props.mainState,
			similarList = this.props.mainState.similarList.items;
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
					{ similarList.length > 0 ? similarList.map(item => (
						<div 
							className='item'
							key={ item.id }
							onClick={ () => {
								this.props.openItem(item.id)} }
						>
							<Link to={`/details/:${item.id}`}>
								<ItemThumbnail item={ item }/>
							</Link>
						</div>
					)) : <div>something went wrong, retry one more time</div>}
				</div>
			</div>
		)
	}
}

export default SimilarList