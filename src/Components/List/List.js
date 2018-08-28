import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import * as BeerAPI from './../BeerAPI'
import Thumbnail from './../Thumbnail/Thumbnail'
import Loading from './../Loading/Loading'
import classes from './List.css'

class List extends Component {
	state = {
		items: [],
    page: null,
    per_page:10,
    isLoadingContent: false,
    isError: false,
    isEndOfList: false
	}

  checkItemError = (element) => {
    if(element instanceof Error || element === undefined) {
      console.log(element)
      if(element instanceof Error && element.statusCode === 429)
        alert('you have reached query limits. Try later in an hour');
      this.setState({
        isError: true,
        isLoadingContent: false
      })
      return true
    }
  }

  downloadNextItems = () => {
    const per_page = this.state.per_page;
    let storedItems = [...this.state.items],
      page = this.state.page + 1;
  	this.setState({ 
      isLoadingContent: true,
      isError: false
		})
    BeerAPI.getAll(page, per_page)
      .then(items => {
        if(this.checkItemError(items)) return;
        if(items.length !== 0) storedItems = storedItems.concat(items);
        //if the queries reached the end of list
        if(items.length === 0) {
					page--;
					this.setState({ isEndOfList: true })
        }
        this.setState({ 
          items: storedItems,
          page,
          isLoadingContent: false
        })
      })
	}

	handleScroll = (e) => {
		const { isEndOfList } = this.state;
		if(isEndOfList) 
			return window.removeEventListener('scroll', this.handleScroll);
		const scrolled = window.innerHeight + window.scrollY,
		preBottom = document.body.offsetHeight - 500,
		items = this.state.items,
		isAlreadyLoading = this.state.isLoadingContent;
		if(scrolled >= preBottom && items.length && !isAlreadyLoading) this.downloadNextItems()
	}

	componentDidMount = () => {
		const { isEndOfList } = this.state;
    this.downloadNextItems();
		( !isEndOfList && window.addEventListener('scroll', this.handleScroll))
	}
	
	componentWillUnmount = () => {
		window.removeEventListener('scroll', this.handleScroll)
	}	

	render() {
		const { 
			items, 
			isLoadingContent, 
			isError, 
			isEndOfList } = this.state;

		const errorMessage = <p>An error occured getting data</p>;
		const itemList =
			<div className={classes['item-list']}>
				{items.map(item => (
					<div
						className={classes.item}
						key={ item.id }
					>
						<Link to={`/details/:${item.id}`}>
							<Thumbnail item={ item }/>
						</Link>
					</div>
				))}
			</div>
		const listEnd = isEndOfList ? <p>List End</p> : null,
			content = !isError ? itemList : errorMessage,
			loading = isLoadingContent ? <Loading/> : null;
		//handling errors while fetching contents
		return (
			<div className={classes.List}>
				{ content }
				{ loading }
				{ listEnd }
			</div>
		)
	}
}

export default List