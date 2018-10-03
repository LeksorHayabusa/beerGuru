import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SuggestionList from '../SuggestionList/SuggestionList';
import Description from '../Description/Description';
import classes from './Page.css';
import WithClass from '../../../hoc/WithClass';

class Page extends Component {
  render() {
    const { 
      isModalOpened,
      wasItOpened
    } = this.props;

    // if (!this.props.isModalOpened) {
    //   return <Redirect push to='/'/>
    // }
    return (
      < Fragment >
        <Description
          parent={this.props}
        />
        <SuggestionList newItem={this.item} />
      </Fragment >
    )
  }
}

Page.propTypes = {
  itemID: PropTypes.number,
  item: PropTypes.object
}

export default WithClass(Page, classes.Page)