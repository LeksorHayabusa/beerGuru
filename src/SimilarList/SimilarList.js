import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import Thumbnail from './../Thumbnail/Thumbnail'
import Loading from './../Loading/Loading'
import classes from './SimilarList.css'

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
			similarList = this.props.mainState.similarList.items,
			loading = isListLoading ? Loading : null
		return (
			<div className={classes.container}>
				{ loading }
				<h4 className={classes.title}>You might also like:</h4>
				<div className={classes.list} id="similarList">
					{ similarList.length > 0 ? similarList.map(item => (
						<div 
							className={classes.item}
							key={ item.id }
							onClick={ () => {
								this.props.openItem(item.id)} }
						>
							<Link to={`/details/:${item.id}`}>
								<Thumbnail item={ item }/>
							</Link>
						</div>
					)) : <div>something went wrong, retry one more time</div>}
				</div>
			</div>
		)
	}
}

export default SimilarList