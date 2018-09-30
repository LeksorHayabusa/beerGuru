import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BeerAPI from '../../BeerAPI';
import SimilarList from './../SimilarList/SimilarList';
import Description from './../../Components/Description/Description';
import classes from './Page.css';
import Aux from '../../hoc/Aux';
import WithClass from '../../hoc/WithClass';
import axios_beerApi from '../../APIs/beerApi';
// import ModalContext from './../../Container/App'
import {statusHandler,itemErrorChecker} from '../../ErrorHandler'

class Page extends Component {
  state = {
    isError: false,
    itemID: null,
    item: {}
  }

  downloadedSingleItem = () => {
    this.setState({ isError: false })
    const itemID = this.state.itemID;
    const query = `/${itemID}`;
    axios_beerApi.get(query)
      .then(res => {
        if (statusHandler(res)) throw statusHandler(res);
        return res.data.shift()
      })
      .catch(er => er)
      .then(item => {
        if (itemErrorChecker(item)) return;
        this.setState({
          isDescriptionLoading: false,
          item: item
        })
      })
  }

  item = (item) => {
    //if item received from SimilarList than push that item without fetching into state array
    if (typeof (item) === 'object') {
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
      () => this.downloadedSingleItem()
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return null

  }

  componentDidMount = () => {
    this.item()
  }

  render() {
    return (
      <Aux>
        {/* <ModalContext.Customer> */}
        <Description state={this.state} />
        <SimilarList newItem={this.item} />
        <Link to='/' className={classes["back-to-list-button"]}><p>Return to the List</p></Link>
        {/* </ModalContext.Customer> */}
      </Aux>
    )
  }
}

Page.propTypes = {
  itemID: PropTypes.number,
  item: PropTypes.object
}

export default WithClass(Page, classes.Page)