import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import * as BeerAPI from '../BeerAPI'
import SimilarList from './SimilarList/SimilarList'
import Description from './Description/Description'
import classes from './Page.css'

class Page extends Component {
	state = {
    isContentLoading: false,
    isError: false,
    itemID: null,
    item: {},
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

  downloadSingleItem = () => {
		const itemID = this.state.itemID;
    this.setState({
      isContentLoading: true,
      isError: false
    })
    BeerAPI.getSingleBeer(itemID)
      .then(item => {
        if(this.checkItemError(item)) return;
        this.setState({
          isContentLoading: false,
          item: item
        })
      })
  }
  
	item = (id) => {
		!id ? id = window.location.pathname.match(/\d+/)[0] : null;
		this.setState(
			{ itemID: id }, 
			() => this.downloadSingleItem()
		)
	}

	componentDidMount = () => {
		this.item()
	}

	render() {
		return (
			<div className={classes.Page}>
				<Description state={this.state}/>
				<SimilarList newItem={ this.item }/>
				<Link to='/' className={classes["back-to-list-button"]}><p>Return ot the List</p></Link>
			</div>
		)
	}
}

export default Page