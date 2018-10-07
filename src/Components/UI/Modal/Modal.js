import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import CloseButton from '../Modal/CloseButton/CloseButton';
import * as actionsCreator from '../../../store/actions/index';
//передать булеан модального в бэкдроп
class modal extends Component {
	render() {
		console.log(this.props.isOpened, 'hello from modal');
		if (this.props.isOpened) {
			return (
				<Fragment>
					<Backdrop/>
					<div className={this.props.isOpened ? classes.Modal : null}
						styles={{
							transform: this.props.isOpened ? 'translateY(0)' : 'translateY(-100vh',
							opacity: this.props.isOpened ? '1' : '0'
						}}
					>
						<CloseButton>Close</CloseButton>
						{this.props.children}
					</div>
				</Fragment>
			)
		} else return <Redirect push to='/' />;
	}
}

const mapStateToProps = state => {
	return { isOpened: state.modalDscrp.isOpened }
}

const mapDispatchToProps = dispatch => {
	return {
		onModalOpen: () => dispatch(actionsCreator.openModal()),
		onModalClose: () => dispatch(actionsCreator.closeModal())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(modal)