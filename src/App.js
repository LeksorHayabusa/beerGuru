import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Page from './Page/Page' 
import List from './List/List'
import classes from './App.css'

class App extends Component {

  render() {
    return (
      <div className={classes.container}>
				<h1 className={classes["main-header"]}>
          <span className={classes.beer}>BEER</span>
          <span>GURU</span>
        </h1>
        <Route path='/details/' render={ () => (
          <Page
            mainState={ this.state }
            openItem={ this.openItem }
            showSimilarItems={ this.showSimilarItems }
            downloadNextItems={ this.downloadNextItems }
            changeSimilarItems={ this.changeSimilarItems }
          />
        )}/> 
        <Route exact path='/' render={ () => (
          <List
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
