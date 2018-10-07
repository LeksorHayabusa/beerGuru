import React from 'react';
import classes from './Backdrop.css';
import { connect } from 'react-redux';

import * as actionsCreator from '../../../store/actions/index';

const backdrop = (props) => (
	props.isOpened ? <div
		className={classes.Backdrop}
		onClick={props.onModalClose}
	/> : null
)

const mapStateToProps = state => {
	return {isOpened: state.modalDscrp.isOpened}
}

const mapDispatchToProps = dispatch => {
	return { onModalClose: () => 
		dispatch(actionsCreator.closeModal()) }
}
export default connect(mapStateToProps, mapDispatchToProps)(backdrop)