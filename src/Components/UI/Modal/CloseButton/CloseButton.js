import React from 'react';
import classes from './CloseButton.css';

const CloseButton = (props) => (
	<button 
		className={classes.closeButton}
		onClick={props.closeModal}
	>{props.children}</button>
)

export default CloseButton