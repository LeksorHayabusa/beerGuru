import React, { Component } from 'react'
import classes from './Loading.css'
import loadingImg from './circle-arrow.svg';

	class Loading extends Component{
	render() {
		return (
			<div
				className={classes.loading}
				style={{
					width: '50px',
					height: '50px',
					backgroundImage: `url("${loadingImg}")`
				}} 
			>
			</div>
		)
	}
}

export default Loading