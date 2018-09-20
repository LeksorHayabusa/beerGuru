import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import Page from './../Container/Page/Page'
import List from './../Container/List/List'
import Layout from './Layout/Layout'
import Modal from '../Components/UI/Modal/Modal'
import Header from '../Components/Layout/Header/Header'
import classes from './App.css'

// export const ModalContext = React.createContext()

class App extends Component {

  state = {
    showModal: this.modal,
    modalContent: null,
    backdrop: false,
    props: {}
  }

  modal = (modalContent = null, props = {}) => {
    this.setState({
      modalContent,
      props
    })
  }

  render() {
    return (
      <Fragment>
        <Layout>
          <Modal>{this.state.modalContent}</Modal>
          <Header>
            <logo className={classes["main-header"]}>
              <span className={classes.beer}>BEER</span>
              <span>GURU</span>
            </logo>
          </Header>
          <Route path='/details/' render={() => (
            <Page />
          )} />
          <Route path='/' render={() => (
            <List />
          )} />
        </Layout>

      </Fragment>
    );
  }
}

export default App
