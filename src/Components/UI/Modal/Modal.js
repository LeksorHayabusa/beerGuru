import React, { Fragment } from 'react';
import { Redirect } from 'react-router';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import CloseButton from '../Modal/CloseButton/CloseButton'

const modal = (props) => {
	if (props.isModalOpened){
		return (
			<Fragment>
				<Backdrop
					isModalOpened={props.isModalOpened}
					closeModal={props.closeModal}
				/>
				<div className={props.isModalOpened ? classes.Modal : null}
					styles={{
						transform: props.isModalOpened ? 'translateY(0)' : 'translateY(-100vh',
						opacity: props.isModalOpened ? '1' : '0'
					}}
				>
					<CloseButton closeModal={props.closeModal}>Close</CloseButton>
					{props.children}
				</div>
			</Fragment>
		) 
	} else return <Redirect push to='/'/>;
}

export default modal