import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => (
	props.isModalOpened ? <div
		className={classes.Backdrop}
		onClick={() => props.closeModal(true)}
	/> : null
)

export default backdrop