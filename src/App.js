import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BeerAPI from './BeerAPI'
import ItemList from './ItemList'
import ItemOpened from './ItemOpened'
import './App.css';

class App extends Component {
  state = {
    items: [],
    page: null,
    per_page:50,
    isListLoading: false,
    isListError: false,
    isListEnd: false,
    isOpenedLoading: false,
    isOpenedError: false,
    openedItemID: null,
    openedItem: {}
  }

  checkItemError = (element) => {
    if(element instanceof Error || element === undefined) {
      console.log(element)
      if(element instanceof Error && element.statusCode == 429)
        alert('you have reached query limits. Try later in an hour');
      this.setState({
        isListError: true,
        isListLoading: false
      })
      return true
    }
  }

  downloadNextItems = () => {
    const per_page = this.state.per_page;
    let storedItems = this.state.items,
      page = this.state.page + 1;
  	this.setState({ 
      isListLoading: true,
      isListError: false
    })
    BeerAPI.getAll(page, per_page)
      .then(items => {
        if(this.checkItemError(items)) return;
        if(items.length != 0) storedItems = storedItems.concat(items);
        //if the queries reached the end of list
        if(items.length === 0) {
        page--;
        this.setState({ isListEnd: true })
        }
        this.setState({ 
          items: storedItems,
          page,
          isListLoading: false
        })
      })
  }

  downloadSingleItem = () => {
    const item = this.state.openedItemID;
    this.setState({
      isOpenedLoading: true,
      isOpenedError: false
    })
    BeerAPI.getSingleBeer(item)
      .then(item => {
        if(this.checkItemError(item)) return;
        this.setState({
          isOpenedLoading: false,
          openedItem: item
        })
      })
      console.log('single item', this.state)    
  }

  openItem = (itemID) => {
    this.setState({ openedItemID: itemID })
    this.downloadSingleItem(itemID)
  }

  componentDidMount() {
    this.downloadNextItems()
  }

  render() {
    return (
      <div>
				<h1 className="main-header">
          <span className="beer-part">BEER</span>
          <span className="guru-part">GURU</span>
        </h1>
        <Route path='/details/' render={ () => (
          <ItemOpened
            mainState={ this.state }
          />
        )}/>
        <Route exect path='/' render={ () => (
          <ItemList
            mainState={ this.state }
            openItem={ this.openItem }
            downloadNextItems={ this.downloadNextItems }
          />
        )}/>
      </div>
    );
  }
}

export default App;
