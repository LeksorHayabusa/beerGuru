import React from 'react'
import classes from './SideDrawer.css'

const sideDrawer = (props) => (
	<div className={classes.SideDrawer}>
		{props.children}
	</div>
)

export default sideDrawer