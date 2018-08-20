import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import ItemThumbnail from './ItemThumbnail'
import loadingImg from './img/circle-arrow.svg';

class SimilarList extends Component {

	componentWillUnmount = () => {
		//clear similar list
		//this.props.changeSimilarItems([])
	}

	render() {
		console.log(this.props.mainState.similarList)
		const {
			isListLoading,
			isListError } = this.props.mainState,
			similarList = this.props.mainState.similarList;
		console.log('hello similaxr render ', this.props.mainState.similarList, similarList)
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
								console.log('clicked item', item.id)
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