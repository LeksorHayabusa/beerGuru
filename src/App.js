import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import ItemList from './itemlist'
import Item from './item'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <ItemList/>
        <Item/>
      </div>
    );
  }
}

export default App;
