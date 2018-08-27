import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import * as BeerAPI from './../../BeerAPI'
import Thumbnail from './../../Thumbnail/Thumbnail'
import Loading from './../../Loading/Loading'
import classes from './SimilarList.css'

class SimilarList extends Component {
	state = {
		isContentLoading: false,
		isError: false,
		quantity: 3,
		items: []
	}

  checkItemError = (element) => {
    if(element instanceof Error || element === undefined) {
      console.log(element)
      if(element instanceof Error && element.statusCode === 429)
        alert('you have reached query limits. Try later in an hour');
      this.setState({
        isError: true,
				isContentLoading: false
      })
      return true
    }
  }
		
	randomItem = () => {
		this.setState({
			isContentLoading: true,
			isError: false
		},
		() =>
		BeerAPI.getSingleBeer('random')
		.then(item => {
			if(this.checkItemError(item)) return;
				const downloadItems = [...this.state.items]
				downloadItems.push(item)
				this.setState({
					isContentLoading: false,
					items: downloadItems
				})
			})
		)
	}
		
	items = () => {
		this.setState({items: []},
		() => {
			let i = this.state.quantity;
			while(i--) {
				this.randomItem()
			}
		})
	}
  
	componentDidMount = () => {
		this.items()
	}

	render() {
		const {
			isContentLoading,
			items } = this.state,
			loading = isContentLoading ? <Loading/> : null,
			showedItems = 
				<div>
					<h4 className={classes.title}>You might like:</h4>
					<div className={classes.list}>
						{ items.map(item => (
							<div 
								className={classes.item}
								key={ item.id }
							>
								<Link 
									to={`/details/:${item.id}`}
									onClick={ () => {
										this.items()
										this.props.newItem(item.id)
									}}
								>
									<Thumbnail item={ item }/>
								</Link>
							</div>
						))}
					</div>
				</div>;
		// const	content = isListLoading ? Loading : null;
		return (
			<div className={classes.container}>
					{ loading }
					{showedItems}
				</div>
		)
	}
}

export default SimilarList