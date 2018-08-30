import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import * as BeerAPI from '../BeerAPI'
import SimilarList from './SimilarList/SimilarList'
import Description from './Description/Description'
import classes from './Page.css'
import Aux from '../../hoc/Aux'
import WithClass from '../../hoc/WithClass'

class Page extends Component {
	state = {
    isError: false,
    itemID: null,
    item: {}
  }

  checkItemError = (element) => {
    if(element instanceof Error || element === undefined) {
      console.log(element)
      if(element instanceof Error && element.statusCode === 429)
        alert('you have reached query limits. Try later in an hour');
      this.setState({
        isError: true
      })
      return true
    }
  }

  downloadSingleItem = () => {
		const itemID = this.state.itemID;
    this.setState({isError: false})
     BeerAPI.getSingleBeer(itemID)
      .then(item => {
        if(this.checkItemError(item)) return;
        this.setState({
          isDescriptionLoading: false,
          item: item
        })
      })
  }
  
	item = (item) => {
    //if item received from SimilarList than push that item without fetching
    if(typeof(item) === 'object') {
      return this.setState({ 
        item,
        itemID: item.id
      })
    }
    //if item is undefined then read its id from location
    let id = item;
    !id ? id = window.location.pathname.match(/\d+/)[0] : null;
    //otherwise the id is specified and must be fetched
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
			<Aux>
        <Description state={this.state}/>
        <SimilarList newItem={ this.item } />
        <Link to='/' className={classes["back-to-list-button"]}><p>Return ot the List</p></Link>
			</Aux>
		)
	}
}

export default WithClass(Page, classes.Page)