import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BeerAPI from './BeerAPI'
import ItemList from './ItemList'
import ItemExtended from './ItemExtended'
import './App.css';

class App extends Component {
  state = {
    items: [],
    page: null,
    per_page:20,
    isLoading: false,
    isError: false,
    isListEnd: false,
    extendedItemID: null
  }

  componentDidMount() {
    this.uploadNextItems()
  }

  uploadNextItems = () => {
    const per_page = this.state.per_page;
    let storedItems = this.state.items,
      page = this.state.page + 1;
  	this.setState({ 
      isLoading: true,
      isError: false
    })
    BeerAPI.getAll(page, per_page)
      .then(items => {
        if(items instanceof Error) return this.setState({
          isError: true,
          isLoading: false
        })
        if(items.length !== 0) storedItems = storedItems.concat(items);
        if(items.length === 0) {
          page--;//if the queries reached the end of list
          this.setState({ isListEnd: true })
        }
        this.setState({ 
          items: storedItems,
          page,
          isLoading: false
        })
      })
  }

  render() {
    return (
      <div>
				<h1 className="main-header">
          <span className="beer-part">BEER</span>
          <span className="guru-part">GURU</span>
        </h1>
        {/* <button onclick={ this.setState({ isError: true })}> hello but</button> */}
          (<ItemList
            mainState={ this.state }
            uploadNextItems={ this.uploadNextItems }
          />
        )}/>
          <ItemExtended
            mainState={ this.state }
          />
        )}/>        
      </div>
    );
  }
}

export default App;
