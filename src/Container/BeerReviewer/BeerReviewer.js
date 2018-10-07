import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Page from './Page/Page';
import List from './List/List';
import Modal from '../../Components/UI/Modal/Modal';

class BeerReviewer extends Component {
	render() {
		return (
			<Fragment>
				<Modal>
					<Route
						path='/details/'
						render={props => (
							<Page/>)}
					/>
				</Modal>
				<Route
					path='/'
					render={props => (<List/>)}
				/>
			</Fragment>
		)
	}
}

export default BeerReviewer