import React, { Component } from 'react'
import classes from './LoadingSpinner.css'
import { lchmodSync } from 'fs';

const Loading = () => {
	return (
		<div className={classes['lds-ellipsis']}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Loading