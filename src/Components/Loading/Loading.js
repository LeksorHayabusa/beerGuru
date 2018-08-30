import React, { Component } from 'react'
import classes from './Loading.css'
import loadingImg from './circle-arrow.svg';

const Loading = () => {
	return (
		<div
			className={classes.icon}
			style={{
				width: '50px',
				height: '50px',
				backgroundImage: `url("${loadingImg}")`
			}} 
		>
		</div>
	)
}

/* class Loading extends Component {
	state = {
		isLoading: false
	}

	loading = (state) => {
	this.setState({ isLoading: state })
	}

	render() {
		if(this.state.isLoading) 
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
		else {return this.props.children}
	}
} */

export default Loading