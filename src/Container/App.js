import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Page from './../Components/Page/Page' 
import List from './../Components/List/List'
import SearchPanel from './../Components/SearchPanel/SearchPanel'
import classes from './App.css'
import Aux from '../hoc/Aux'
import WithClass from '../hoc/WithClass'

class App extends Component {

  render() {
    return (
      <Aux>
				<h1 className={classes["main-header"]}>
          <span className={classes.beer}>BEER</span>
          <span>GURU</span>
        </h1>
        <SearchPanel/>
        <Route path='/details/' render={ () => (
          <Page
          />
        )}/> 
        <Route exact path='/' render={ () => (
          <List
          />
        )}/>
      </Aux>
    );
  }
}

export default WithClass(App, classes.App)
