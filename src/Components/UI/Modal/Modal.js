import React from 'react'
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
	<dialog className={classes.Modal}>
		<Backdrop/>
		{props.state.modalContent}
	</dialog>
)

export default modal