import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Page from './../Components/Page/Page' 
import List from './../Components/List/List'
import classes from './App.css'

class App extends Component {

  render() {
    return (
      <div className={classes.App}>
				<h1 className={classes["main-header"]}>
          <span className={classes.beer}>BEER</span>
          <span>GURU</span>
        </h1>
        <Route path='/details/' render={ () => (
          <Page
          />
        )}/> 
        <Route exact path='/' render={ () => (
          <List
          />
        )}/>
      </div>
    );
  }
}

export default App;
