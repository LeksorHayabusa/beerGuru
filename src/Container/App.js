import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Page from './../Container/Page/Page'
import List from './../Container/List/List'
import classes from './App.css'
import Aux from '../hoc/Aux'
import WithClass from '../hoc/WithClass'

// export const ModalContext = React.createContext()

class App extends Component {

  state = {
    showModalWindow: this.modalWindow,
    content: null,
    props: {}
  }

  modalWindow = (content = null, props = {}) => {
    this.state({
      content,
      props
    })
  }

  render() {
    const ModalContent = this.state.content;
    return (
        <Aux>
      {/* <ModalContext.Provider> */}
          <h1 className={classes["main-header"]}>
            <span className={classes.beer}>BEER</span>
            <span>GURU</span>
          </h1>
          <Route path='/details/' render={() => (
            <Page />
          )} />
          <Route path='/' render={() => (
            <List />
          )} />
      {/* </ModalContext.Provider> */}
        </Aux>
    );
  }
}

export default WithClass(App, classes.App)
