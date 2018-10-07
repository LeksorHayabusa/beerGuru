import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SuggestionList from '../SuggestionList/SuggestionList';
import Description from '../Description/Description';
import classes from './Page.css';

  class Page extends Component {
    render() {
      return (
        <div className={classes.Page}>
          <Description
            {...this.props}
          />
          <SuggestionList newItem={this.item} />
        </div>
      )
    }
  }

Page.propTypes = {
  itemID: PropTypes.number,
  item: PropTypes.object
}

export default Page