import React, { Component } from 'react';
import Layout from './../Container/Layout/Layout';
import BeerReviewer from './../Container/BeerReviewer/BeerReviewer';
import classes from './App.css';
import WithClass from '../hoc/WithClass';

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
      <Layout>
        <h1 className={classes["main-header"]}>
          <span className={classes.beer}>BEER</span>
          <span>GURU</span>
        </h1>
        <BeerReviewer />
      </Layout>
    );
  }
}

export default WithClass(App, classes.App)
