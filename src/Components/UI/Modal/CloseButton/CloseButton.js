import React from 'react';
import classes from './CloseButton.css';
import { connect } from 'react-redux';

import * as actionsCreator from '../../../../store/actions/index';
const CloseButton = (props) => (
	<button 
		className={classes.closeButton}
		onClick={props.onModalClose}
	>{props.children}</button>
)

const mapDispatchToProps = dispatch => {
	return {
		onModalClose: () => dispatch(actionsCreator.closeModal())
	}
}
export default connect(undefined, mapDispatchToProps)(CloseButton)