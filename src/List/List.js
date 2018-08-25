import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import Thumbnail from './../Thumbnail/Thumbnail'
import Loading from './../Loading/Loading'
import classes from './List.css'

class List extends Component {

	handleScroll = (e) => {
		const { isListEnd } = this.props.mainState;
		if(isListEnd) 
			return window.removeEventListener('scroll', this.handleScroll);
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
				<div className={classes.list} id="itemList">
					{items.map(item => (
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
					))}
				</div>
			</div>;
		const listEnd = isListEnd ? <p>List End</p> : null,
			content = !isListError ? itemList : errorMessage,
			loading = isListLoading ? <Loading/> : null;
		//handling errors while fetching contents
		return (
			<div className={classes.container}>
				{ content }
				{ loading }
				{ listEnd }
			</div>
		)
	}
}

export default List