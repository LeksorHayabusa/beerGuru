import React from 'react';
import { connect } from 'react-redux';

import closebutton_classes from './CloseButton.css';
import button_classes from '../../Button/Button.css';
import * as actionsCreator from '../../../../store/actions/index';

const classesArray = [button_classes.Button];
let classes;
if( window.innerWidth <= 600 ) {
	classesArray.push(closebutton_classes['mobile-closeButton'])
} else {
	classesArray.push(closebutton_classes['desktop-closeButton'])
}
classes = classesArray.join(' ');

const CloseButton = (props) => (
	<button 
		className={classes}
		onClick={props.onModalClose}
	>{props.children}</button>
)

const mapDispatchToProps = dispatch => {
	return {
		onModalClose: () => dispatch(actionsCreator.closeModal())
	}
}
export default connect(undefined, mapDispatchToProps)(CloseButton)